import { Prisma, Coordinator } from "@prisma/client";

export interface CoordinatorRepository {
    findByEmail(email: string): Promise <Coordinator | null>

    create(datra: Prisma.CoordinatorCreateInput): Promise <Coordinator>
}