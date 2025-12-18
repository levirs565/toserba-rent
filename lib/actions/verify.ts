"use server";

import { VerificationState } from "@/app/generated/prisma/enums";
import { hasKtp } from "../auth";
import prisma from "../prisma";
import { getSession } from "../session";
import { storage } from "../storage";

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
      verificationState: VerificationState.PENDING,
      verificationStateChangedTime: new Date()
    },
  });

  return { success: true };
}
