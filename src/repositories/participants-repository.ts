import { Participant, Prisma } from "@prisma/client";

export interface ParticipantsRepository {
    findById(id: string): Promise<Participant | null>;
    findByEmail(email: string): Promise<Participant | null>;
    findByCPF(cpf: string): Promise<Participant | null>;
    create(data: Prisma.ParticipantCreateInput): Promise<Participant>;
    update(id: string, data: Prisma.ParticipantUpdateInput): Promise<Participant | null>; 
    delete(id: string): Promise<Participant | null>;
    updatePassword(id: string, newPasswordHash: string): Promise<Participant | null>;
}