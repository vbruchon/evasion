-- CreateTable
CREATE TABLE "accommodation_drafts" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodation_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accommodation_drafts_accommodationId_key" ON "accommodation_drafts"("accommodationId");

-- AddForeignKey
ALTER TABLE "accommodation_drafts" ADD CONSTRAINT "accommodation_drafts_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
