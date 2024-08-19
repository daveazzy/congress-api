import { prisma } from '@/lib/prisma';
import { Prisma, Professor } from '@prisma/client';
import { ProfessorRepository } from '../professor-repository';

export class PrismaProfessorRepository implements ProfessorRepository{
    async findByEmail(email: string): Promise<Professor | null> {
        const professor = await prisma.professor.findUnique({
            where: {
                email
            }
        })

        return professor
    }
    
    async create(data: Prisma.ProfessorCreateInput){
        const professor = await prisma.professor.create({
            data
        })

        return professor
    }
}