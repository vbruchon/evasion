-- CreateTable
CREATE TABLE "accommodations_page_content" (
    "id" TEXT NOT NULL,
    "heroEyebrow" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImageUrl" TEXT,
    "heroImageFileKey" TEXT,
    "ctaEyebrow" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaButtonLabel" TEXT NOT NULL,
    "ctaImageUrl" TEXT,
    "ctaImageFileKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodations_page_content_pkey" PRIMARY KEY ("id")
);
