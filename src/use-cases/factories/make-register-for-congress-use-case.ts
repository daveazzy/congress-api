import { RegisterForCongressUseCase } from "../modules/congress/participant-check-in";
import { PrismaCheckInRepository } from "../modules/congress/repositories/prisma/prisma-check-in-repository";
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";
import { PrismaCongressRepository } from "../modules/congress/repositories/prisma/prisma-congress-repository";

export function makeRegisterForCongressUseCase() {
    const checkInRepository = new PrismaCheckInRepository()
    const participantRepository = new PrismaParticipantRepository()
    const congressRepository = new PrismaCongressRepository()

    return new RegisterForCongressUseCase(
        checkInRepository,
        participantRepository,
        congressRepository
    );
}
