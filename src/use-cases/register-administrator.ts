import { AdministratorRepository } from "@/repositories/administrator-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import bcrypt from 'bcryptjs'

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
        const passwordHash = await bcrypt.hash(password, 6)

        const userWithSameEmail = await this.coordinatorRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const administrator = await this.coordinatorRepository.create({
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
        return{
            administrator
        }
    }
}