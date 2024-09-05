import { prisma } from "@/lib/prisma";
import { CheckInRepository } from "../participant-check-in-repository";
import { CheckIn, Prisma } from "@prisma/client";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInCreateInput): Promise<CheckIn>{
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async findByParticipantId(participantId: string, congressId: string, eventId?: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                participantId,
                congressId,
                eventId: eventId ?? undefined,
            },
        });
        return checkIn;
    }
}
