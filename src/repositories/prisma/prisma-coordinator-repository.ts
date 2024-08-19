import { prisma } from "@/lib/prisma";
import { Coordinator, Prisma } from "@prisma/client";
import { CoordinatorRepository } from "../coordinator.repository";

export class PrismaCoordinatorRepository implements CoordinatorRepository{
    async findByEmail(email: string): Promise<Coordinator | null> {
        const coordinator = await prisma.coordinator.findUnique({
            where: {
                email
            }
        })

        return coordinator
    }

    async create(data: Prisma.CoordinatorCreateInput){
        const coordinator = await prisma.coordinator.create({
            data
        })

        return coordinator
    }
}