import { VerificationState } from "@/app/generated/prisma/enums";
import prisma from "./prisma";
import { getSession } from "./session";

export async function getVerificationRequstList() {
  const users = await prisma.user.findMany({
    where: {
      verificationState: VerificationState.PENDING,
      verificationStateChangedTime: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
    },
    orderBy: {
      verificationStateChangedTime: "asc",
    },
  });

  return users;
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      birthDate: true,
      birthPlace: true,
      email: true,
      phone: true,
      hasKtp: true,
      hasProfile: true,
      name: true,
      nik: true,
      id: true,
      verificationState: true,
      verificationStateChangedTime: true,
    },
  });

  return user;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session.userId) return null;

  return await getUser(session.userId);
}

export async function getCurrentUserProfile() {
  const session = await getSession();

  if (!session.userId) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      birthDate: true,
      birthPlace: true,
      email: true,
      phone: true,
      hasKtp: true,
      hasProfile: true,
      name: true,
      nik: true,
      verificationState: true,
      verificationStateChangedTime: true,
      userAddresses: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  });

  if (!user) return;

  const { userAddresses, ...rest } = user;

  return {
    ...rest,
    addresses: userAddresses,
  };
}

export async function getUserAddress() {
  const session = await getSession();

  if (!session.userId) return null;

  const data = await prisma.userAddress.findMany({
    where: {
      userId: session.userId,
    },
    select: {
      id: true,
      name: true,
      address: true,
    },
  });

  return data;
}
