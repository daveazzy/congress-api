import { ParticipantsRepository } from "@/repositories/participants-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { Participant } from "@prisma/client";
import bcryptjs from 'bcryptjs'

interface AuthenticateParticipantUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateParticipantUseCaseResponse {
    participant: Participant
}



export class AuthenticateParticipantUseCase {
    constructor(private participantRepository: ParticipantsRepository){}

    async handle({email, password}: AuthenticateParticipantUseCaseRequest): Promise<AuthenticateParticipantUseCaseResponse>{
        const participant = await this.participantRepository.findByEmail(email)

        if(!participant){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await bcryptjs.compare(password, participant.passwordHash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { 
            participant,
        }
    }
}