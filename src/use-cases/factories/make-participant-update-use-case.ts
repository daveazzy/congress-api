import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";
import { ParticipantUpdateUseCase } from "../participant-update-use-case"; 

export function makeParticipantUpdateUseCase() {
    const prismaParticipantRepository = new PrismaParticipantRepository();
    const participantUpdateUseCase = new ParticipantUpdateUseCase(prismaParticipantRepository);

    return participantUpdateUseCase;
}
