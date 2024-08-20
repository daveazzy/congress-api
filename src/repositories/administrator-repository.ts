import { Prisma, Administrator } from "@prisma/client";

export interface AdministratorRepository {
    findByEmail(email: string): Promise <Administrator | null>

    create(datra: Prisma.AdministratorCreateInput): Promise <Administrator>
}