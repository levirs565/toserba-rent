"use server";

import { redirect } from "next/navigation";
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

  if (!userId)
    return {
      success: false,
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
    success: true,
  };
}

export async function payCart() {
  const userId = (await getSession()).userId;

  if (!userId)
    return {
      success: false,
    };

  let cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
      paymentId: null,
    },
    select: {
      id: true,
      rents: {
        select: {
          id: true,
          needDeliver: true,
          durationDay: true,
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  if (!cart) return;

  const now = new Date();
  let totalPrice = 15000;

  await Promise.all(cart.rents.map((item) => {
    totalPrice += item.durationDay * item.product.price + (item.needDeliver ? 25000 : 0)
    return prisma.rent.update({
      where: {
        id: item.id,
      },
      data: {
        startDate: now,
        rentPrice: item.product.price,
      }
    })
  }))

  await prisma.cart.update({
    where: {
      id: cart.id
    },
    data: {
      payment: {
        create: {
          amount: totalPrice,
          isPaid: true
        }
      }
    }
  })

  redirect("/cart")
}
