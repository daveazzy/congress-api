import { CoordinatorRepository } from "@/repositories/coordinator.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExixstsError } from "./errors/user-already-exists";

interface coordinatorUseCaseRequest {
    name: string,
    email: string,
    institution: string,
    jobTitle: string,
    password: string
}

export class CoordinatorUseCase {
    constructor(private coordinatorRepository: CoordinatorRepository){}

    async handle({name, email, institution, jobTitle, password}: coordinatorUseCaseRequest){
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.coordinatorRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExixstsError()
        }

        await this.coordinatorRepository.create({
            name, 
            email,
            institution,
            jobTitle,
            passwordHash
        })
    }
}