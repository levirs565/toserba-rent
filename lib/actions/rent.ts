"use server";

import { RequestState } from "@/app/generated/prisma/enums";
import prisma from "../prisma";
import { getSession } from "../session";
import { revalidatePath } from "next/cache";

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

  revalidatePath(`/provider/${rentId}`)
}
