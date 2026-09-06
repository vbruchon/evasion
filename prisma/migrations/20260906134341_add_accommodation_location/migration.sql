/*
  Warnings:

  - You are about to drop the column `city` on the `accommodations` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `accommodations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accommodations" DROP COLUMN "city",
DROP COLUMN "region",
ADD COLUMN     "locationDescription" TEXT,
ADD COLUMN     "locationLatitude" DOUBLE PRECISION,
ADD COLUMN     "locationLongitude" DOUBLE PRECISION,
ADD COLUMN     "locationRadiusMeters" INTEGER,
ADD COLUMN     "locationTitle" TEXT;

-- CreateTable
CREATE TABLE "accommodation_accesses" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "details" TEXT,
    "accommodationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodation_accesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accommodation_accesses_accommodationId_idx" ON "accommodation_accesses"("accommodationId");

-- CreateIndex
CREATE UNIQUE INDEX "accommodation_accesses_accommodationId_key_key" ON "accommodation_accesses"("accommodationId", "key");

-- AddForeignKey
ALTER TABLE "accommodation_accesses" ADD CONSTRAINT "accommodation_accesses_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
