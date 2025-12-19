-- AlterTable
ALTER TABLE "rents" ADD COLUMN     "deliver_address_id" UUID;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_deliver_address_id_fkey" FOREIGN KEY ("deliver_address_id") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
