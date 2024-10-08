-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "email" TEXT NOT NULL,
    "institution" TEXT,
    "state" TEXT,
    "academicBackground" TEXT,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "academicBackground" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "administrators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviewers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "academicBackground" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviewers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "congresses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "knowledgeArea" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "administratorId" TEXT NOT NULL,

    CONSTRAINT "congresses_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speakers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "photoUri" TEXT NOT NULL,
    "presentationTitle" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "congressId" TEXT NOT NULL,
    "administratorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "speakers_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_ReviewerCongress" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_cpf_key" ON "participants"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "participants_email_key" ON "participants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "administrators_cpf_key" ON "administrators"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "administrators_email_key" ON "administrators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reviewers_cpf_key" ON "reviewers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "reviewers_email_key" ON "reviewers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "congresses_name_key" ON "congresses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_participantId_congressId_key" ON "registrations"("participantId", "congressId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "accreditations_participantId_congressId_key" ON "accreditations"("participantId", "congressId");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewerCongress_AB_unique" ON "_ReviewerCongress"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewerCongress_B_index" ON "_ReviewerCongress"("B");

-- AddForeignKey
ALTER TABLE "congresses" ADD CONSTRAINT "congresses_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accreditations" ADD CONSTRAINT "accreditations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accreditations" ADD CONSTRAINT "accreditations_congressId_fkey" FOREIGN KEY ("congressId") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewerCongress" ADD CONSTRAINT "_ReviewerCongress_A_fkey" FOREIGN KEY ("A") REFERENCES "congresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewerCongress" ADD CONSTRAINT "_ReviewerCongress_B_fkey" FOREIGN KEY ("B") REFERENCES "reviewers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
