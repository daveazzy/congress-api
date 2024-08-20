import { AdministratorRepository } from "@/repositories/administrator-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExixstsError } from "./errors/user-already-exists";

interface coordinatorUseCaseRequest {
    name: string,
    cpf: string,
    email: string,
    institution: string,
    city: string,
    state: string,
    academicBackground: string,
    jobTitle: string,
    password: string
}

export class AdministratorUseCase {
    constructor(private coordinatorRepository: AdministratorRepository){}

    async handle({name, cpf, email, institution,city , state, academicBackground, jobTitle, password}: coordinatorUseCaseRequest){
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.coordinatorRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExixstsError()
        }

        await this.coordinatorRepository.create({
            name,
            cpf,
            email,
            institution, 
            city,
            state,
            academicBackground,
            jobTitle,
            passwordHash
        })
    }
}