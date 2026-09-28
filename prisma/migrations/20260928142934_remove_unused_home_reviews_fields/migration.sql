/*
  Warnings:

  - You are about to drop the column `reviewsDescription` on the `home_page_content` table. All the data in the column will be lost.
  - You are about to drop the column `reviewsTitle` on the `home_page_content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "home_page_content" DROP COLUMN "reviewsDescription",
DROP COLUMN "reviewsTitle";
