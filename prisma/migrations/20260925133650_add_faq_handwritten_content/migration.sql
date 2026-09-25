-- AlterTable
ALTER TABLE "faq_page_content"
ADD COLUMN "heroHandwrittenFirstLine" TEXT,
ADD COLUMN "heroHandwrittenSecondLine" TEXT;

UPDATE "faq_page_content"
SET
  "heroHandwrittenFirstLine" = 'Toutes les réponses,',
  "heroHandwrittenSecondLine" = 'simplement.'
WHERE
  "heroHandwrittenFirstLine" IS NULL
  OR "heroHandwrittenSecondLine" IS NULL;

ALTER TABLE "faq_page_content"
ALTER COLUMN "heroHandwrittenFirstLine" SET NOT NULL,
ALTER COLUMN "heroHandwrittenSecondLine" SET NOT NULL;