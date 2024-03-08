/*
  Warnings:

  - You are about to drop the column `decription` on the `elections` table. All the data in the column will be lost.
  - Added the required column `description` to the `elections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "elections" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT NOT NULL;
