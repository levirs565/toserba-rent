"use server";

import { VerificationState } from "@/app/generated/prisma/enums";
import { hasKtp } from "../auth";
import prisma from "../prisma";
import { getSession } from "../session";
import { storage } from "../storage";
import { redirect } from "next/navigation";
import { SendProfileSchema } from "../definitions";

export async function sendKtp(state: any, formData: FormData) {
  const userId = (await getSession()).userId;

  if (!userId) return { success: false };

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      hasKtp: true,
      verificationState: true,
      verificationStateChangedTime: true,
    },
  });

  if (!data) return { success: false };

  if (
    data.verificationStateChangedTime &&
    data.verificationState != VerificationState.REJECTED
  ) {
    return { success: false };
  }

  const ktp = formData.get("ktp");
  const selfie = formData.get("selfie");

  if (!(ktp instanceof File) || !(selfie instanceof File))
    return { success: false };
  if (!hasKtp && (ktp.size == 0 || selfie.size == 0)) return { success: false };

  if (ktp.size > 0)
    await storage.setItemRaw(`users/${userId}/ktp`, await ktp.bytes());
  if (selfie.size > 0)
    await storage.setItemRaw(`users/${userId}/selfie`, await selfie.bytes());

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasKtp: true,
    },
  });

  return { success: true };
}

export async function sendProfile(state: any, formData: FormData) {
  const userId = (await getSession()).userId;

  if (!userId) return { success: false };

  const fields = {
    nik: String(formData.get("nik")),
    birthPlace: String(formData.get("birthPlace")),
    birthDate: new Date(String(formData.get("birthDate"))),
  };
  const validatedFields = SendProfileSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const inputData = validatedFields.data;

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      verificationState: true,
      verificationStateChangedTime: true,
    },
  });

  if (!data) return { success: false };

  if (
    data.verificationStateChangedTime &&
    data.verificationState != VerificationState.REJECTED
  ) {
    return { success: false };
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      nik: inputData.nik,
      birthDate: inputData.birthDate,
      birthPlace: inputData.birthPlace,
      verificationState: VerificationState.PENDING,
      verificationStateChangedTime: new Date(),
    },
  });

  return { success: true };
}

export async function setVerificationState(userId: string, action: string) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      verificationState:
        action == "accept"
          ? VerificationState.ACCEPTED
          : VerificationState.REJECTED,
      verificationStateChangedTime: new Date(),
    },
  });

  redirect("/admin/verify");
}
