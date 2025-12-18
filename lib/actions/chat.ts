"use server"

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { getSession } from "../session";

export async function addChat(toId: string, formData: FormData) {
  const fromId = (await getSession()).userId;

  if (!fromId) return;

  const message = String(formData.get("message")).trim()

  if (message.length == 0) return;

  await prisma.chatMessage.create({
    data: {
      fromId,
      toId,
      message
    }
  })

  // revalidatePath("/message", "layout")
  revalidatePath(`/message/${toId}`)
}
