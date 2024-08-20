import { prisma } from "@/lib/prisma";
import { Administrator, Prisma } from "@prisma/client";
import { AdministratorRepository } from "../administrator-repository";

export class PrismaAdministratorRepository implements AdministratorRepository{
    async findByEmail(email: string): Promise<Administrator | null> {
        const coordinator = await prisma.administrator.findUnique({
            where: {
                email
            }
        })

        return coordinator
    }

    async create(data: Prisma.AdministratorCreateInput){
        const coordinator = await prisma.administrator.create({
            data
        })

        return coordinator
    }
}