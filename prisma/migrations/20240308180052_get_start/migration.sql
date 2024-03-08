-- CreateTable
CREATE TABLE "Voter" (
    "id" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_registration_key" ON "Voter"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_email_key" ON "Voter"("email");
