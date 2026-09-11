-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "lastReviewsImportAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AccommodationReview" (
    "id" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,
    "importKey" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccommodationReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AccommodationReview_accommodationId_reviewedAt_idx" ON "AccommodationReview"("accommodationId", "reviewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AccommodationReview_accommodationId_importKey_key" ON "AccommodationReview"("accommodationId", "importKey");

-- AddForeignKey
ALTER TABLE "AccommodationReview" ADD CONSTRAINT "AccommodationReview_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
