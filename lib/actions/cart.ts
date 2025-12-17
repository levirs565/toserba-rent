"use server";

import { AddCartData, AddCartSchema } from "../definitions";
import prisma from "../prisma";
import { getSession } from "../session";

export async function addCart(state: any, rawData: AddCartData) {
  const validatedFields = AddCartSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const userId = (await getSession()).userId;

  if (!userId) return {
    success: false
  };

  let cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
      paymentId: null,
    },
    select: {
      id: true,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: userId,
        paymentId: null,
      },
      select: {
        id: true,
      },
    });
  }

  await prisma.rent.create({
    data: {
      cartId: cart.id,
      productId: data.id,
      durationDay: data.durationDay,
      needDeliver: data.needDeliver,
    },
  });

  return {
    success: true
  }
}
