import prisma from "./prisma";
import { getSession } from "./session";

export async function getUserRents() {
  const id = (await getSession()).userId;

  if (!id) return [];

  const data = await prisma.rent.findMany({
    where: {
      cart: {
        userId: id
      }
    },
    select: {
      id: true,
      startDate: true,
      durationDay: true,
      needDeliver: true,
      requestState: true,
      product: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return data;
}
