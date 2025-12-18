-- AlterTable
ALTER TABLE "rent_returns" ADD COLUMN     "paymentId" UUID;

-- AddForeignKey
ALTER TABLE "rent_returns" ADD CONSTRAINT "rent_returns_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
