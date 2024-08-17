import { Participant, Prisma } from "@prisma/client";

export interface ParticipantsRepository {
    findByEmail(email: string): Promise <Participant | null>

    create(data: Prisma.ParticipantCreateInput): Promise<Participant>
}