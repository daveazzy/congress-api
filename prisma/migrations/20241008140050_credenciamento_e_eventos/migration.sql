/*
  Warnings:

  - You are about to drop the column `created_at` on the `accreditations` table. All the data in the column will be lost.
  - You are about to drop the column `validated_at` on the `accreditations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accreditations" DROP COLUMN "created_at",
DROP COLUMN "validated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "validatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedAt" TIMESTAMP(3),
    "validatedBy" TEXT,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendances_participantId_eventId_key" ON "attendances"("participantId", "eventId");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
