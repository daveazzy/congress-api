import { Accreditation, Prisma } from "@prisma/client";
import { AccreditationRepository } from "../accreditation-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAccreditationRepository implements AccreditationRepository {
    async create(data: Prisma.AccreditationCreateInput): Promise<Accreditation>{
        const accreditation = await prisma.accreditation.create({
            data
        })

        return accreditation
    }
}