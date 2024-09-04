/*
  Warnings:

  - Added the required column `knowledgeArea` to the `congresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "congresses" ADD COLUMN     "knowledgeArea" TEXT NOT NULL;
