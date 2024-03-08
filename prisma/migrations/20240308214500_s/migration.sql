/*
  Warnings:

  - Added the required column `electionId` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electionId` to the `positions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electionId` to the `voters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "electionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "positions" ADD COLUMN     "electionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "voters" ADD COLUMN     "electionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "voters" ADD CONSTRAINT "voters_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
