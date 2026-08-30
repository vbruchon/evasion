-- CreateTable
CREATE TABLE "accommodation_highlights" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "accommodationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodation_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accommodation_highlights_accommodationId_position_idx" ON "accommodation_highlights"("accommodationId", "position");

-- AddForeignKey
ALTER TABLE "accommodation_highlights" ADD CONSTRAINT "accommodation_highlights_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
