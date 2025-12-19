import prisma from "./prisma";
import { getSession } from "./session";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session.userId) return null;

  const data = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      name: true,
      verificationState: true,
      verificationStateChangedTime: true,
      isAdmin: true
    },
  });

  if (!data) return null;

  return {
    name: data.name,
    verification: data.verificationStateChangedTime ? data.verificationState : null,
    isAdmin: data.isAdmin
  };
}

export async function hasKtp() {
  const session = await getSession();

  if (!session.userId) return false;

  const data = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      hasKtp: true,
    },
  });

  if (!data) return false;

  return data.hasKtp;
}

export async function getVerificationState() {
  const session = await getSession();

  if (!session.userId) return null;

  const data = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      verificationState: true,
      verificationStateChangedTime: true
    },
  });

  if (!data) return null;

  return {
    state: data.verificationState,
    changedTime: data.verificationStateChangedTime
  };
}
