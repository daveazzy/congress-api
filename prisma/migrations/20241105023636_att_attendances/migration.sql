/*
  Warnings:

  - A unique constraint covering the columns `[participantId,speakerId]` on the table `attendances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "speakerId" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attendances_participantId_speakerId_key" ON "attendances"("participantId", "speakerId");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "speakers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
