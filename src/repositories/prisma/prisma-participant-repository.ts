import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";

export class PrismaParticipantRepository implements ParticipantsRepository{
    async findByEmail(email: string) {
        const participant = await prisma.participant.findUnique({
            where: {
                email,
            }
        })

        return participant
    }
    
    async create(data: Prisma.ParticipantCreateInput) {
        const participant = await prisma.participant.create({
            data,
        })

        return participant
    }
}