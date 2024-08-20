/*
  Warnings:

  - You are about to drop the column `type` on the `participants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ParticipantType";
