import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { storage } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; }> }
) {
  const {id} = await params;
  const key = `products/${id}/image`;

  if (!(await storage.hasItem(key)))
    return new NextResponse("Not Found", { status: 404 });

  const buffer = await storage.getItemRaw(key);

  return new Response(buffer, {
    headers: { "Content-Type": "image/*" },
  });
}
