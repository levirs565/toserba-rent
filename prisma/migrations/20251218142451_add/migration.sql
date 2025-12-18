-- CreateTable
CREATE TABLE "rent_returns" (
    "rent_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "denda" INTEGER,
    "requestState" "RequestState" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "rent_returns_pkey" PRIMARY KEY ("rent_id")
);

-- AddForeignKey
ALTER TABLE "rent_returns" ADD CONSTRAINT "rent_returns_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
