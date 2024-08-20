/*
  Warnings:

  - You are about to drop the column `latitude` on the `congresses` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `congresses` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `_CoordinatorCongress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessorCongress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coordinators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `administratorId` to the `congresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `congresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('CONGRESSISTA', 'CONVIDADO');

-- DropForeignKey
ALTER TABLE "_CoordinatorCongress" DROP CONSTRAINT "_CoordinatorCongress_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoordinatorCongress" DROP CONSTRAINT "_CoordinatorCongress_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessorCongress" DROP CONSTRAINT "_ProfessorCongress_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessorCongress" DROP CONSTRAINT "_ProfessorCongress_B_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_professorId_fkey";

-- AlterTable
ALTER TABLE "congresses" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "administratorId" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "academicBackground" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "type" "ParticipantType" NOT NULL,
ALTER COLUMN "institution" DROP NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "professorId",
ADD COLUMN     "reviewerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CoordinatorCongress";

-- DropTable
DROP TABLE "_ProfessorCongress";

-- DropTable
DROP TABLE "coordinators";

-- DropTable
DROP TABLE "professors";

-- CreateTable
CREATE TABLE "administrators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "academicBackground" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "administrators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviewers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "academicBackground" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviewers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "academicBackground" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "committees" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "administratorId" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "committees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,
    "eventId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReviewerCongress" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "administrators_cpf_key" ON "administrators"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "administrators_email_key" ON "administrators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reviewers_cpf_key" ON "reviewers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "reviewers_email_key" ON "reviewers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_cpf_key" ON "professionals"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewerCongress_AB_unique" ON "_ReviewerCongress"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewerCongress_B_index" ON "_ReviewerCongress"("B");

-- CreateIndex
CREATE UNIQUE INDEX "participants_cpf_key" ON "participants"("cpf");

-- AddForeignKey
ALTER TABLE "congresses" ADD CONSTRAINT "congresses_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committees" ADD CONSTRAINT "committees_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committees" ADD CONSTRAINT "committees_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committees" ADD CONSTRAINT "committees_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "reviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewerCongress" ADD CONSTRAINT "_ReviewerCongress_A_fkey" FOREIGN KEY ("A") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewerCongress" ADD CONSTRAINT "_ReviewerCongress_B_fkey" FOREIGN KEY ("B") REFERENCES "reviewers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
