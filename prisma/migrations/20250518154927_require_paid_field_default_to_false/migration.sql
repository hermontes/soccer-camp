/*
  Warnings:

  - Made the column `paid` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "user" SET "paid" = false WHERE "paid" IS NULL;

ALTER TABLE "user" ALTER COLUMN "paid" SET NOT NULL,
ALTER COLUMN "paid" SET DEFAULT false;
