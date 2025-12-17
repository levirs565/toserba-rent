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
  if (!userId) return [];
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      paymentId: null,
    },
    select: {
      rents: {
        select: {
          needDeliver: true,
          durationDay: true,
          product: true,
        },
      },
    },
  });
  if (!cart) return [];
  return cart.rents.map((rent) => ({
    durationDay: rent.durationDay,
    needDeliver: rent.needDeliver,
    product: {
      id: rent.product.id,
      name: rent.product.name,
      category: "Other",
      pricePerDay: rent.product.price,
      status: "ready",
      location: "",
      description: "",
      imageColor: "",
    },
  }));
}
