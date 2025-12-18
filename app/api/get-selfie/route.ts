import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const userId = (await getSession()).userId;

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      hasKtp: true,
    },
  });

  if (!data) return new NextResponse("Unauthorized", { status: 401 });

  if (!data.hasKtp) return new NextResponse("Not Found", { status: 404 });

  const key = `users/${userId}/selfie`;

  if (!(await storage.hasItem(key)))
    return new NextResponse("Not Found", { status: 404 });

  const buffer = await storage.getItemRaw(key);

  return new Response(buffer, {
    headers: { 'Content-Type': 'image/*' },
  })
}
