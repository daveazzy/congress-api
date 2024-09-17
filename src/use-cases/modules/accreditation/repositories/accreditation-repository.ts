import { Accreditation, Prisma } from "@prisma/client";

export interface AccreditationRepository {
    create(data: Prisma.AccreditationCreateInput): Promise <Accreditation>
}