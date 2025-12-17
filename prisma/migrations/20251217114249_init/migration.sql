-- CreateEnum
CREATE TYPE "VerificationState" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" DATE,
    "birth_place" TEXT,
    "nik" TEXT,
    "verification_state" "VerificationState" NOT NULL DEFAULT 'PENDING',
    "verification_state_changed_time" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
