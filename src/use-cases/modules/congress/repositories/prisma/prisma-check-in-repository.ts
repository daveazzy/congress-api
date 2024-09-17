import { prisma } from "@/lib/prisma";
import { CheckInRepository } from "../participant-check-in-repository";
import { Registration, Prisma } from "@prisma/client";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.RegistrationCreateInput): Promise<Registration> {
        const checkIn = await prisma.registration.create({
            data,
        });

        return checkIn;
    }

    async findByParticipantId(participantId: string, congressId: string): Promise<Registration | null> {
        const checkIn = await prisma.registration.findUnique({
            where: {
                participantId_congressId: {
                    participantId: participantId,
                    congressId: congressId,
                },
            },
        });
        return checkIn;
    }
}
