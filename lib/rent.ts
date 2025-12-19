import prisma from "./prisma";
import { getSession } from "./session";

export async function getUserRents() {
  const id = (await getSession()).userId;

  if (!id) return null;

  const data = await prisma.rent.findMany({
    where: {
      cart: {
        userId: id,
        paymentId: {
          not: null
        }
      },
    },
    select: {
      id: true,
      startDate: true,
      durationDay: true,
      needDeliver: true,
      requestState: true,
      rentReturn: {
        select: {
          paymentId: true,
          requestState: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          userId: true
        },
      },
    },
  });

  return data;
}

export async function getRentReturn(rentId: string) {
  const id = (await getSession()).userId;

  if (!id) return null;

  const rentReturn = await prisma.rentReturn.findUnique({
    where: {
      rentId,
    },
    select: {
      denda: true,
      paymentId: true,
      rent: {
        select: {
          durationDay: true,
          rentPrice: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
          cart: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
  });

  if (!rentReturn) return null;
  if (rentReturn.rent.cart.userId != id) return null;

  return {
    denda: rentReturn.denda,
    rent: rentReturn.rent,
    paymentId: rentReturn.paymentId,
    product: {
      id: rentReturn.rent.product.id,
      name: rentReturn.rent.product.name,
    },
  };
}
