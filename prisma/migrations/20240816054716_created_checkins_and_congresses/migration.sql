/*
  Warnings:

  - You are about to drop the column `instituition` on the `participants` table. All the data in the column will be lost.
  - Added the required column `institution` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "instituition",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "institution" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "congresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "congresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "participantId" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_participantId_congressId_key" ON "check_ins"("participantId", "congressId");

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
