/*
  Warnings:

  - You are about to drop the `committees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professionals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_eventId_fkey";

-- DropForeignKey
ALTER TABLE "committees" DROP CONSTRAINT "committees_administratorId_fkey";

-- DropForeignKey
ALTER TABLE "committees" DROP CONSTRAINT "committees_congressId_fkey";

-- DropForeignKey
ALTER TABLE "committees" DROP CONSTRAINT "committees_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_participantId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_congressId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_speakerId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_congressId_fkey";

-- DropForeignKey
ALTER TABLE "works" DROP CONSTRAINT "works_speakerId_fkey";

-- DropTable
DROP TABLE "committees";

-- DropTable
DROP TABLE "evaluations";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "professionals";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "works";

-- CreateTable
CREATE TABLE "speakers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "photoUri" TEXT NOT NULL,
    "presentationTitle" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,
    "administratorId" TEXT NOT NULL,

    CONSTRAINT "speakers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
