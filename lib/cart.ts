import prisma from "./prisma";
import { getSession } from "./session";

export async function isInCart(productId: string) {
    const userId = (await getSession()).userId
    if (!userId) return false
    const count = await prisma.rent.count({
        where: {
            productId: productId,
            cart: {
                userId,
                paymentId: null
            }
        }
    })
    return count > 0
}