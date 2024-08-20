import { prisma } from '@/lib/prisma';
import { Prisma, Reviewer } from '@prisma/client';
import { ReviewerRepository } from '../reviewer-repository';
import { validateCPF } from '@/use-cases/data-treatments/cpf-validator';
import { InvalidCpfError } from '@/use-cases/errors/invalid-cpf';

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
        if(!validateCPF(data.cpf)){
            throw new InvalidCpfError();
        }
        const reviewer = await prisma.reviewer.create({
            data
        })

        return reviewer
    }
}