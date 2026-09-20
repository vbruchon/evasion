/*
  Warnings:

  - Added the required column `ctaHandwrittenHighlight` to the `reviews_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ctaHandwrittenPrefix` to the `reviews_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroHandwrittenFirstLine` to the `reviews_page_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heroHandwrittenSecondLine` to the `reviews_page_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews_page_content"
ADD COLUMN "heroHandwrittenFirstLine" TEXT,
ADD COLUMN "heroHandwrittenSecondLine" TEXT,
ADD COLUMN "ctaHandwrittenPrefix" TEXT,
ADD COLUMN "ctaHandwrittenHighlight" TEXT;

UPDATE "reviews_page_content"
SET
  "heroHandwrittenFirstLine" = 'Plus qu’un séjour,',
  "heroHandwrittenSecondLine" = 'une Évasion.',
  "ctaHandwrittenPrefix" = 'Le temps de',
  "ctaHandwrittenHighlight" = 's’évader un instant.';

ALTER TABLE "reviews_page_content"
ALTER COLUMN "heroHandwrittenFirstLine" SET NOT NULL,
ALTER COLUMN "heroHandwrittenSecondLine" SET NOT NULL,
ALTER COLUMN "ctaHandwrittenPrefix" SET NOT NULL,
ALTER COLUMN "ctaHandwrittenHighlight" SET NOT NULL;
