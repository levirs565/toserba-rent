-- AlterTable
ALTER TABLE "products" ADD COLUMN     "address_id" UUID;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
