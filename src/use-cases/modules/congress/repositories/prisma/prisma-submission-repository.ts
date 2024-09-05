import { Prisma, Submission } from "@prisma/client";
import { SubmissionRepository } from "../submission-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSubmissionRepository implements SubmissionRepository{
    async create(data: Prisma.SubmissionCreateInput): Promise <Submission>{
        const submission = await prisma.submission.create({
            data
        })

        return submission
    }
}