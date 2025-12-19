import { RequestState } from "@/app/generated/prisma/enums";
import prisma from "./prisma";
import { getSession } from "./session";

export async function isInCart(productId: string) {
  const userId = (await getSession()).userId;
  if (!userId) return false;
  const count = await prisma.rent.count({
    where: {
      productId: productId,
      cart: {
        userId,
        paymentId: null,
      },
    },
  });
  return count > 0;
}

export async function getCartProducts() {
  const userId = (await getSession()).userId;
  if (!userId) return null;
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      paymentId: null,
    },
    select: {
      rents: {
        select: {
          id: true,
          needDeliver: true,
          durationDay: true,
          product: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
              _count: {
                select: {
                  rents: {
                    where: {
                      requestState: {
                        not: RequestState.REJECTED,
                      },
                      cart: {
                        paymentId: {
                          not: null,
                        },
                      },
                      OR: [
                        { rentReturn: null },
                        {
                          rentReturn: {
                            paymentId: null,
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!cart) return [];
  return cart.rents.map((rent) => ({
    id: rent.id,
    durationDay: rent.durationDay,
    needDeliver: rent.needDeliver,
    product: {
      id: rent.product.id,
      name: rent.product.name,
      category: rent.product.category?.name ?? "Other",
      pricePerDay: rent.product.price,
      status: rent.product._count.rents > 0 ? "rented" : "ready",
      location: "",
      description: "",
      imageColor: "",
    },
  }));
}
