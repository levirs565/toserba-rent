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

export async function getAllProducts() {
    const products = await prisma.product.findMany()

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

export async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

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
    }
}