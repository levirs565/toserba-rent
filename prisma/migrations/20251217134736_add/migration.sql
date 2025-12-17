-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "specs" TEXT[],
    "stock" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
