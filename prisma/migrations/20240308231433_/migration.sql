/*
  Warnings:

  - You are about to drop the column `isActive` on the `elections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "elections" DROP COLUMN "isActive",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT true;
