import { prisma } from '@/lib/prisma';
import { Prisma, Reviewer } from '@prisma/client';
import { ReviewerRepository } from '../reviewer-repository';

export class PrismaReviewerRepository implements ReviewerRepository{
    async findByEmail(email: string): Promise<Reviewer | null> {
        const professor = await prisma.reviewer.findUnique({
            where: {
                email
            }
        })

        return professor
    }
    
    async create(data: Prisma.ReviewerCreateInput){
        const professor = await prisma.reviewer.create({
            data
        })

        return professor
    }
}