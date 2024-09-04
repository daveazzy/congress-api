import { Prisma, Administrator } from "@prisma/client";

export interface AdministratorRepository {
    findByEmail(email: string): Promise <Administrator | null>

    create(data: Prisma.AdministratorCreateInput): Promise <Administrator>
}