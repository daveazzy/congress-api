import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository"
import { ParticipantUseCase } from "../register-participant"

export function makeParticipantRegisterUseCase(){
    const prismaParticipantRepository = new PrismaParticipantRepository()
    const participantUseCase = new ParticipantUseCase(prismaParticipantRepository)

    return participantUseCase
}