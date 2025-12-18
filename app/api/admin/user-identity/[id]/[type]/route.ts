import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; type: string }> }
) {
  const { id, type} = await params;

  if (type != "ktp" && type != "selfie") {
    return new NextResponse("Not Found", { status: 404 });
  }

  const data = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      hasKtp: true,
    },
  });

  if (!data || !data.hasKtp) return new NextResponse("Not Found", { status: 404 });

  const key = `users/${id}/${type}`;

  if (!(await storage.hasItem(key)))
    return new NextResponse("Not Found", { status: 404 });

  const buffer = await storage.getItemRaw(key);

  return new Response(buffer, {
    headers: { "Content-Type": "image/*" },
  });
}
