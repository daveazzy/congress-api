/*
  Warnings:

  - You are about to drop the column `title` on the `congresses` table. All the data in the column will be lost.
  - Added the required column `name` to the `congresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "congresses_title_key";

-- AlterTable
ALTER TABLE "congresses" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;
