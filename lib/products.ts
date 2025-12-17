"use server";

import prisma from "./prisma";
import { getSession } from "./session";

export async function getUserProducts() {
    const userId = (await getSession()).userId

    if (!userId) return [];

    const products = await prisma.product.findMany({
        where: {
            userId
        }
    })

    return products.map((product) => ({
          id: product.id,
          name: product.name,
          category: "Other",
          pricePerDay: product.price,
          status: "ready",
          location: "",
          description: "",
          imageColor: "",
    }))
}