/*
  Warnings:

  - Made the column `icon` on table `accommodation_highlights` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accommodation_highlights" ALTER COLUMN "icon" SET NOT NULL;
