"use server";

import { redirect } from "next/navigation";
import { AddAddressSchema } from "../definitions";
import prisma from "../prisma";
import { getSession } from "../session";

export async function addUserAddress(state: any, formData: FormData) {
  const userId = (await getSession()).userId;

  if (!userId) return { success: false };

  const fields = {
    name: String(formData.get("name")),
    address: String(formData.get("address")),
  };
  const validatedFields = AddAddressSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  await prisma.userAddress.create({
    data: {
        userId,
        name: data.name,
        address: data.address
    }
  })

  redirect("/user");
}
