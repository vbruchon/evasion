-- CreateTable
CREATE TABLE "reviews_page_content" (
    "id" TEXT NOT NULL,
    "heroEyebrow" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImageUrl" TEXT,
    "heroImageFileKey" TEXT,
    "recentReviewsEyebrow" TEXT NOT NULL,
    "recentReviewsTitle" TEXT NOT NULL,
    "recentReviewsDescription" TEXT NOT NULL,
    "allReviewsTitle" TEXT NOT NULL,
    "allReviewsDescription" TEXT NOT NULL,
    "ctaEyebrow" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "ctaButtonLabel" TEXT NOT NULL,
    "ctaImageUrl" TEXT,
    "ctaImageFileKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_page_content_pkey" PRIMARY KEY ("id")
);
