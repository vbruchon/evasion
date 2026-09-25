-- CreateTable
CREATE TABLE "faq_page_content" (
    "id" TEXT NOT NULL,
    "heroEyebrow" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "questionsEyebrow" TEXT NOT NULL,
    "questionsTitle" TEXT NOT NULL,
    "questionsDescription" TEXT NOT NULL,
    "ctaEyebrow" TEXT NOT NULL,
    "ctaTitle" TEXT NOT NULL,
    "ctaDescription" TEXT NOT NULL,
    "ctaButtonLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_page_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_items" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "faqPageContentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "faq_items_faqPageContentId_position_idx" ON "faq_items"("faqPageContentId", "position");

-- AddForeignKey
ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_faqPageContentId_fkey" FOREIGN KEY ("faqPageContentId") REFERENCES "faq_page_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
