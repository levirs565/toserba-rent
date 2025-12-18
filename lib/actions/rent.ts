"use server";

import { RequestState } from "@/app/generated/prisma/enums";
import prisma from "../prisma";
import { getSession } from "../session";
import { revalidatePath } from "next/cache";
import { addDays, differenceInDays } from "date-fns";
import { redirect } from "next/navigation";

export async function setRentRequestResult(rentId: string, accepted: boolean) {
  const userId = (await getSession()).userId;
  if (!userId) return;

  const rent = await prisma.rent.findUnique({
    where: {
      id: rentId,
    },
    select: {
      requestState: true,
      product: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!rent) return;
  if (rent.product.userId != userId) return;
  if (rent.requestState != RequestState.PENDING) return;

  await prisma.rent.update({
    where: {
      id: rentId,
    },
    data: {
      requestState: accepted ? RequestState.ACCEPTED : RequestState.REJECTED,
    },
  });

  // TODO: Pngembalian uang

  revalidatePath(`/provider/${rentId}`);
}

export async function returnRent(rentId: string) {
  const userId = (await getSession()).userId;
  if (!userId) return;

  const rent = await prisma.rent.findUnique({
    where: {
      id: rentId,
    },
    select: {
      cart: {
        select: {
          userId: true
        }
      },
      requestState: true,
      rentReturn: {
        select: {
          requestState: true,
        },
      },
    },
  });

  if (!rent) return;
  if (rent.cart.userId != userId) return;
  if (rent.requestState != RequestState.ACCEPTED) return;
  if (rent.rentReturn && rent.rentReturn.requestState != RequestState.REJECTED)
    return;


  await prisma.rentReturn.upsert({
    where: {
      rentId: rentId,
    },
    update: {
      date: new Date(),
      requestState: RequestState.PENDING,
    },
    create: {
      rentId: rentId,
      date: new Date(),
    },
  });

  revalidatePath(`/renter`);
}

export async function setRentReturnRequestResult(
  rentId: string,
  accepted: boolean
) {
  const userId = (await getSession()).userId;
  if (!userId) return;

  const rent = await prisma.rent.findUnique({
    where: {
      id: rentId,
    },
    select: {
      startDate: true,
      durationDay: true,
      rentReturn: {
        select: {
          requestState: true,
        },
      },
      product: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!rent || !rent.startDate) return;
  if (rent.product.userId != userId) return;
  if (!rent.rentReturn || rent.rentReturn.requestState != RequestState.PENDING)
    return;

  await prisma.rentReturn.update({
    where: {
      rentId: rentId,
    },
    data: {
      requestState: accepted ? RequestState.ACCEPTED : RequestState.REJECTED,
      denda:
        Math.max(
          differenceInDays(
            new Date(),
            addDays(rent.startDate, rent.durationDay)
          ),
          0
        ) * 5000,
    },
  });

  revalidatePath(`/provider/${rentId}`);
}

export async function payReturn(rentId: string) {
  const userId = (await getSession()).userId;
  if (!userId) return;

  const rent = await prisma.rent.findUnique({
    where: {
      id: rentId,
    },
    select: {
      durationDay: true,
      rentPrice: true,
      rentReturn: {
        select: {
          denda: true,
          requestState: true,
        },
      },
      cart: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!rent) return;
  if (rent.cart.userId != userId) return;
  if (!rent.rentReturn || rent.rentReturn.requestState != RequestState.ACCEPTED)
    return;

  await prisma.payment.create({
    data: {
      amount:
        ((rent.rentPrice ?? 0) * rent.durationDay) / 2 +
        (rent.rentReturn.denda ?? 0),
      isPaid: true,
      rentReturns: {
        connect: {
          rentId,
        },
      },
    },
  });

  redirect(`/renter`);
}
