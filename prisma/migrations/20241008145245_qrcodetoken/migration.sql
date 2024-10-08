/*
  Warnings:

  - A unique constraint covering the columns `[qrCodeToken]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrCodeToken` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "photoUri" TEXT;

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "photoUri" TEXT,
ADD COLUMN     "qrCodeToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviewers" ADD COLUMN     "photoUri" TEXT;

-- AlterTable
ALTER TABLE "speakers" ALTER COLUMN "photoUri" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "participants_qrCodeToken_key" ON "participants"("qrCodeToken");
