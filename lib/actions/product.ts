"use server";

import { revalidatePath } from "next/cache";
import { AddProductFormSchema } from "../definitions";
import prisma from "../prisma";
import { getSession } from "../session";
import { redirect } from "next/navigation";
import { storage } from "../storage";

export async function addProduct(state: any, formData: FormData) {
  const fields = {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    price: parseInt(String(formData.get("price"))),
    description: String(formData.get("description")),
    address: String(formData.get("address")),
  };
  const image = formData.get("image");
  const validatedFields = AddProductFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!(image instanceof File)) return;

  const data = validatedFields.data;

  const userId = (await getSession()).userId;

  if (userId == null) {
    return;
  }

  const result = await prisma.product.create({
    select: {
      id: true,
    },
    data: {
      name: data.name,
      price: data.price,
      stock: 1,
      descripton: data.description,
      user: {
        connect: {
          id: userId,
        },
      },
      address: {
        connect: {
          id: data.address,
          userId: userId,
        },
      },
      category: {
        connectOrCreate: {
          where: {
            name: data.category,
          },
          create: {
            name: data.category,
          },
        },
      },
    },
  });

  await storage.setItemRaw(`/products/${result.id}/image`, await image.bytes());

  redirect("/provider");
}
