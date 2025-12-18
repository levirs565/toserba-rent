"use server";

import { RequestState } from "@/app/generated/prisma/enums";
import prisma from "./prisma";
import { getSession } from "./session";

export async function getUserProducts() {
  const userId = (await getSession()).userId;

  if (!userId) return [];

  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          rents: {
            where: {
              requestState: "PENDING",
              cart: {
                paymentId: {
                  not: null,
                },
              },
            },
          },
        },
      },
    },
  });

  const returnRequestCount = (await prisma.product.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      _count: {
        select: {
          rents: {
            where: {
              rentReturn: {
                requestState: "PENDING",
              },
            },
          },
        },
      },
    },
  })).reduce((prev, current) => {
    prev.set(current.id, current._count.rents)
    return prev
  }, new Map<string, number>());

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: "Other",
    pricePerDay: product.price,
    status: "ready",
    location: "",
    description: "",
    imageColor: "",
    requestCount: product._count.rents,
    returnRequestCount: returnRequestCount.get(product.id) ?? 0
  }));
}

export async function getAllProducts() {
  const products = await prisma.product.findMany();

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: "Other",
    pricePerDay: product.price,
    status: "ready",
    location: "",
    description: "",
    imageColor: "",
  }));
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    category: "Other",
    pricePerDay: product.price,
    status: "ready",
    location: "",
    description: "",
    imageColor: "",
    userId: product.userId
  };
}

export async function getProductWithRent(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      rents: {
        where: {
          cart: {
            paymentId: {
              not: null,
            },
          },
        },
        select: {
          id: true,
          startDate: true,
          durationDay: true,
          needDeliver: true,
          requestState: true,
          cart: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          rentReturn: {
            select: {
              date: true,
              requestState: true,
              paymentId: true
            }
          }
        },
      },
    },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    category: "Other",
    pricePerDay: product.price,
    status: "ready",
    location: "",
    description: "",
    imageColor: "",
    rents: product.rents.map((rent) => ({
      id: rent.id,
      startDate: rent.startDate,
      durationDay: rent.durationDay,
      needDeliver: rent.needDeliver,
      requestState: rent.requestState,
      user: {
        id: rent.cart.user.id,
        name: rent.cart.user.name,
      },
      rentReturn: rent.rentReturn
    })),
  };
}
