import { Registration } from "@prisma/client"
import { CheckInRepository } from "./repositories/participant-check-in-repository"
import { ParticipantsRepository } from "@/repositories/participants-repository"
import { CongressRepository } from "./repositories/congress-repository"

interface RegisterForCongressUseCaseRequest{
    participantId: string
    congressId: string
}

interface RegisterForCongressUseCaseResponse {
    checkIn: Registration
}

export class RegisterForCongressUseCase {
    constructor(
        private checkInRepository : CheckInRepository,
        private participantRepository: ParticipantsRepository,
        private congressRepository: CongressRepository
    ){}

    async handle({ participantId, congressId}: RegisterForCongressUseCaseRequest): Promise<RegisterForCongressUseCaseResponse>{
        const checkIn = await this.checkInRepository.create({
            participant: {
                connect: { id: participantId}
            }, 
            congress: {
                connect: { id: congressId}
            }
        })

        return {
            checkIn,
        }
    }
}