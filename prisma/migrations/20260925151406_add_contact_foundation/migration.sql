-- CreateTable
CREATE TABLE "contact_page_content" (
    "id" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "handwritten" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "submitLabel" TEXT NOT NULL,
    "successEyebrow" TEXT NOT NULL,
    "successTitle" TEXT NOT NULL,
    "successDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_page_content_pkey" PRIMARY KEY ("id")
);