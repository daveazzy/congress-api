/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `congresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "congresses_name_key" ON "congresses"("name");
