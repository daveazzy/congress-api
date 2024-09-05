/*
  Warnings:

  - A unique constraint covering the columns `[participantId]` on the table `check_ins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "check_ins_participantId_key" ON "check_ins"("participantId");
