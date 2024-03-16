-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "elections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voters" (
    "id" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "electionId" TEXT NOT NULL,
    "alreadyVoted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "voters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "voters" ADD CONSTRAINT "voters_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "voters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
