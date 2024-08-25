import { Prisma, Participant } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";

export class InMemoryParticipantsRepository implements ParticipantsRepository{
    public items: Participant[] = []

    async findByEmail(email: string) {
        const participant = this.items.find(item => item.email === email)

        if(!participant){
            return null
        }

        return participant
    }
    async create(data: Prisma.ParticipantCreateInput){
        const participant = {
            id: 'user-1',
            name: data.name,
            cpf: data.cpf ?? null,
            email: data.email,
            institution: data.institution ?? null,
            state: data.state ?? null,
            academicBackground: data.academicBackground ?? null,
            passwordHash: data.passwordHash,
            createdAt: new Date(),
        }

        this.items.push(participant)

        return participant
    }

}