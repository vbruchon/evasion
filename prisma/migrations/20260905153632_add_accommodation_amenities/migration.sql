-- CreateTable
CREATE TABLE "accommodation_amenities" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "details" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "accommodationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodation_amenities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accommodation_amenities_accommodationId_position_idx" ON "accommodation_amenities"("accommodationId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "accommodation_amenities_accommodationId_key_key" ON "accommodation_amenities"("accommodationId", "key");

-- AddForeignKey
ALTER TABLE "accommodation_amenities" ADD CONSTRAINT "accommodation_amenities_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
