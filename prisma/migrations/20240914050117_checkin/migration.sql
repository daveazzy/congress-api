/*
  Warnings:

  - You are about to drop the `check_ins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_congressId_fkey";

-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_participantId_fkey";

-- DropTable
DROP TABLE "check_ins";

-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "participantId" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accreditations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "validatedBy" TEXT,
    "paymentType" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "qrCodeToken" TEXT,
    "participantId" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "accreditations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registrations_participantId_congressId_key" ON "registrations"("participantId", "congressId");

-- CreateIndex
CREATE UNIQUE INDEX "accreditations_participantId_congressId_key" ON "accreditations"("participantId", "congressId");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accreditations" ADD CONSTRAINT "accreditations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accreditations" ADD CONSTRAINT "accreditations_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
