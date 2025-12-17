import { Prisma } from "@/app/generated/prisma/client";

export namespace PrismaHelper {
  export function isRecordNotFoundError(e: any) {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code == 'P2025'
    );
  }

  export function isUniqueConstraintFailed(e: any) {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code == 'P2002'
    );
  }

    export function isForeignConstraintFailed(e: any) {
    return (
      e instanceof Prisma.PrismaClientKnownRequestError && e.code == 'P2003'
    );
  }
}