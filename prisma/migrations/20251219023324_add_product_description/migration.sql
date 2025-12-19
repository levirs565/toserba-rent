/*
  Warnings:

  - You are about to drop the column `specs` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "specs",
ADD COLUMN     "descripton" TEXT NOT NULL DEFAULT '';
