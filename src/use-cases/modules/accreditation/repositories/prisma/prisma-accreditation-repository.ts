import { Accreditation, Prisma } from "@prisma/client";
import { AccreditationRepository } from "../accreditation-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAccreditationRepository implements AccreditationRepository {
    async create(data: Prisma.AccreditationCreateInput): Promise<Accreditation> {
        try {
            const existingAccreditation = await prisma.accreditation.findUnique({
                where: {
                    participantId_congressId: {
                        participantId: data.participant.connect?.id || "",
                        congressId: data.congress.connect?.id || "",
                    }
                }
            });

            if (existingAccreditation) {
                throw new Error("Este participante já foi credenciado para este congresso.");
            }

            const accreditation = await prisma.accreditation.create({
                data
            });

            return accreditation;
        } catch (error) {
            console.error("Erro ao criar credenciamento:", error);
            throw new Error("Não foi possível criar o credenciamento.");
        }
    }
}
