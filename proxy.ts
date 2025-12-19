import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";
import prisma from "./lib/prisma";

export async function proxy(request: NextRequest) {
  const user = (await getSession()).userId;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const data = await prisma.user.findUnique({
      where: {
        id: user,
      },
      select: {
        isAdmin: true,
      },
    });
    if (!data?.isAdmin)
      return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
