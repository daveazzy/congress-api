import { Prisma, Submission } from "@prisma/client";

export interface SubmissionRepository {
    create(data: Prisma.SubmissionCreateInput): Promise <Submission>
}