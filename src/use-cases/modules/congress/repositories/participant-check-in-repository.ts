import { Registration, Prisma } from "@prisma/client";

export interface CheckInRepository {
    create(data: Prisma.RegistrationCreateInput): Promise <Registration>

    findByParticipantId(participantId: string, congressId: string, eventId: string): Promise<Registration | null>
}