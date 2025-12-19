"use server";

import { redirect } from "next/navigation";
import { AddCartData, AddCartSchema } from "../definitions";
import prisma from "../prisma";
import { getSession } from "../session";
import { revalidatePath } from "next/cache";

export async function addCart(state: any, rawData: AddCartData) {
  const validatedFields = AddCartSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  if (data.needDeliver && !data.address)
    return {
      success: false,
    };

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
      cart: {
        connect: {
          id: cart.id,
        },
      },
      product: {
        connect: {
          id: data.id,
        },
      },
      deliverAddress: !data.needDeliver
        ? undefined
        : {
            connect: {
              id: data.address ?? "NEVER",
              userId: userId,
            },
          },
      durationDay: data.durationDay,
      needDeliver: data.needDeliver,
    },
  });

  return {
    success: true,
  };
}

export async function removeCart(rentId: string) {
  const userId = (await getSession()).userId;

  if (!userId) return;

  await prisma.rent.delete({
    where: {
      id: rentId,
      cart: {
        paymentId: null,
        userId,
      },
    },
  });

  revalidatePath("/cart");
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
  let totalPrice = 0;

  await Promise.all(
    cart.rents.map((item) => {
      totalPrice +=
        (item.durationDay * item.product.price) / 2 +
        (item.needDeliver ? 25000 : 0) +
        15000;
      return prisma.rent.update({
        where: {
          id: item.id,
        },
        data: {
          startDate: now,
          rentPrice: item.product.price,
        },
      });
    })
  );

  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      payment: {
        create: {
          amount: totalPrice,
          isPaid: true,
        },
      },
    },
  });

  redirect("/renter");
}

export async function payProduct(rawData: AddCartData) {
  const validatedFields = AddCartSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  if (data.needDeliver && !data.address)
    return {
      success: false,
    };

  const userId = (await getSession()).userId;

  if (!userId)
    return {
      success: false,
    };

  const product = await prisma.product.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!product)
    return {
      success: false,
    };

  // TODO: Cek lagi
  await prisma.payment.create({
    data: {
      amount:
        (product.price * data.durationDay) / 2 +
        (data.needDeliver ? 25000 : 0) +
        15000,
      isPaid: true,

      carts: {
        create: {
          userId: userId,
          rents: {
            create: {
              durationDay: data.durationDay,
              needDeliver: data.needDeliver,
              startDate: new Date(),
              product: { connect: { id: data.id } },
              rentPrice: product.price,
              deliverAddress: !data.needDeliver
                ? undefined
                : {
                    connect: {
                      id: data.address ?? "NEVER",
                      userId: userId,
                    },
                  },
            },
          },
        },
      },
    },
  });

  redirect("/renter");
}
