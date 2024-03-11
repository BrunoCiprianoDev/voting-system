/*
  Warnings:

  - You are about to drop the column `electionId` on the `vote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_electionId_fkey";

-- AlterTable
ALTER TABLE "vote" DROP COLUMN "electionId";
