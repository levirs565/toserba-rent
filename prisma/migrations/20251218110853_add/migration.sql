/*
  Warnings:

  - You are about to drop the column `accepted` on the `rents` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "rents" DROP COLUMN "accepted",
ADD COLUMN     "requestState" "RequestState" NOT NULL DEFAULT 'PENDING';
