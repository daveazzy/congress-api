import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ParticipantsRepository } from "../participants-repository";
import { validateCPF } from "@/use-cases/data-treatments/cpf-validator";
import { InvalidCpfError } from "@/use-cases/errors/invalid-cpf";


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
        if(data.cpf && !validateCPF(data.cpf)){
            throw new InvalidCpfError();
        }
        const participant = await prisma.participant.create({
            data,
        })

        return participant
    }
}