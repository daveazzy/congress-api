import { PrismaSubmissionRepository } from "../modules/congress/repositories/prisma/prisma-submission-repository";
import { SubmissionUseCase } from "../modules/congress/submission-use-case";

export function makeSubmissionUseCase () {
    const submissionRepository = new PrismaSubmissionRepository()
    const submissionUseCase = new SubmissionUseCase(submissionRepository)

    return submissionUseCase
}