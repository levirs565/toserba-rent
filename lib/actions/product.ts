"use server";

import { revalidatePath } from "next/cache";
import { AddProductFormSchema } from "../definitions";
import prisma from "../prisma";
import { getSession } from "../session";
import { redirect } from "next/navigation";

export async function addProduct(state: any, formData: FormData) {
  const fields = {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    price: parseInt(String(formData.get("price"))),
  };
  const validatedFields = AddProductFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      ...fields,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const userId = (await getSession()).userId;

  if (userId == null) {
    return;
  }

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: 1,
      user: {
        connect: {
          id: userId
        }
      },
      category: {
        connectOrCreate: {
          where: {
            name: data.category
          },
          create: {
            name: data.category
          }
        }
      },
    },
  });

  redirect("/provider");
}
