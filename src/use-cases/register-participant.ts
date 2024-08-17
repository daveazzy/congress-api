import { ParticipantsRepository } from "@/repositories/participants-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExixstsError } from "./errors/user-already-exists"

interface participantUseCaseRequest{
    name: string,
    email: string,
    institution: string,
    password: string
}

export class ParticipantUseCase {
    constructor(private participantsRepository: ParticipantsRepository) {}

    async handle({name, email, institution, password}: participantUseCaseRequest) {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.participantsRepository.findByEmail(email)
    
        if(userWithSameEmail){
            throw new UserAlreadyExixstsError()
        }
    
        await this.participantsRepository.create({
            name,
            email,
            institution,
            passwordHash
        })
    }
}

