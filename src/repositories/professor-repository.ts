import { Prisma, Professor } from "@prisma/client";

export interface ProfessorRepository {
    findByEmail(email: string): Promise <Professor | null>

    create(data: Prisma.ProfessorCreateInput): Promise<Professor>
}