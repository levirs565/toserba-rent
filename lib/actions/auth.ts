"use server";

import { LoginFormSchema, RegisterFormSchema } from "../definitions";
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";
import { PrismaHelper } from "../utils";
import { redirect } from "next/navigation";
import { VerificationState } from "@/app/generated/prisma/enums";
import { getSession } from "../session";

export async function register(state: any, formData: FormData) {
  const fields = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    password: String(formData.get("password")),
    passwordRepeat: String(formData.get("passwordRepeat")),
  };
  const validatedFields = RegisterFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      globalError: undefined,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash: await argon2.hash(data.password),
      },
    });
  } catch (e: any) {
    if (PrismaHelper.isUniqueConstraintFailed(e)) {
      return {
        ...fields,
        errors: undefined,
        globalError: "Email atau nomor telepon sudah digunakan",
      };
    } else throw e;
  }

  redirect("/login");
}

export async function login(state: any, formData: FormData) {
  const fields = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };
  const validatedFields = LoginFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      globalError: undefined,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      passwordHash: true,
      verificationState: true,
      verificationStateChangedTime: true,
    },
  });

  if (!user || !(await argon2.verify(user.passwordHash, data.password))) {
    return {
      ...fields,
      errors: undefined,
      globalError: "Email atau password salah",
    };
  }

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  if (
    user.verificationState == VerificationState.PENDING &&
    user.verificationStateChangedTime == null
  ) {
    redirect("/verify");
    return;
  }

  redirect("/");
}

export async function logout() {
    const session = await getSession();
  session.userId = undefined;
  await session.save();

  redirect("/")
}