import { prisma } from "@/lib/prisma";
import { Prisma, Participant } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";
import { validateCPF } from "@/use-cases/data-treatments/cpf-validator";
import { InvalidCpfError } from "@/use-cases/errors/invalid-cpf";

export class PrismaParticipantRepository implements ParticipantsRepository {
    async findById(id: string): Promise<Participant | null> {
        return await prisma.participant.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<Participant | null> {
        return await prisma.participant.findUnique({
            where: { email },
        });
    }

    async findByCPF(cpf: string): Promise<Participant | null> {
        return await prisma.participant.findUnique({
            where: { cpf },
        });
    }

    async create(data: Prisma.ParticipantCreateInput): Promise<Participant> {
        if (data.cpf && !validateCPF(data.cpf)) {
            throw new InvalidCpfError();
        }
        return await prisma.participant.create({
            data,
        });
    }

    async update(id: string, data: Prisma.ParticipantUpdateInput): Promise<Participant | null> {
        return await prisma.participant.update({
            where: { id },
            data,
        });
    }
}
