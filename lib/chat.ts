"use server"

import prisma from "./prisma";
import { getSession } from "./session";

export async function getChatPartners() {
  const id = (await getSession()).userId;

  if (!id) return [];

  const partners: {user_id: string}[] = await prisma.$queryRaw`
    SELECT DISTINCT 
        CASE 
          WHEN from_id = ${id} THEN to_id
          ELSE from_id
        END AS user_id
    FROM chat_messages
    WHERE from_id = ${id} OR
          to_id = ${id}
  `;

  console.log(partners)

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: partners.map((it) => it.user_id)
      }
    },
    select: {
      id: true,
      name: true
    }
  })

  return users
}

export async function getChatParnerData(id: string) {
  const currentId = (await getSession()).userId

  if (!currentId) return null;

  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
    }
  })

  if (!user) return null;

  const messages = await prisma.chatMessage.findMany({
    where: {
      OR: [
        {
          fromId: id,
          toId: currentId
        },
        {
          fromId: currentId,
          toId: id
        }
      ]
    },
    select: {
      id: true,
      fromId: true,
      message: true,
      date: true
    },
    orderBy: {
      date: "asc"
    }
  })

  return {
    user,
    messages: messages.map((message) => ({
      isCurrentUser: message.fromId == currentId,
      ...message
    }))
  }
}
