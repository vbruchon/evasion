/*
  Warnings:

  - You are about to drop the column `heroImageFileKey` on the `about_page_content` table. All the data in the column will be lost.
  - You are about to drop the column `heroImageUrl` on the `about_page_content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "about_page_content" DROP COLUMN "heroImageFileKey",
DROP COLUMN "heroImageUrl";
