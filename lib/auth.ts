import prisma from "./prisma";
import { getSession } from "./session";

export async function getCurrentUser() {
    const session = await getSession()

    if (!session.userId) return null;

    const data = await prisma.user.findUnique({
        where: {
            id: session.userId
        },
        select: {
            name: true
        }
    })

    if (!data) return null

    return {
        name: data.name
    }
}