import { AdministratorRepository } from "@/repositories/administrator-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { Administrator } from "@prisma/client";
import bcryptjs from 'bcryptjs'


interface AuthenticateAdministratorUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateAdministratorUseCaseResponse {
    administrator: Administrator
}



export class AuthenticateAdministratorUseCase {
    constructor(private administratorRepository: AdministratorRepository){}

    async handle({email, password}: AuthenticateAdministratorUseCaseRequest): Promise<AuthenticateAdministratorUseCaseResponse>{
        const administrator = await this.administratorRepository.findByEmail(email)

        if(!administrator){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await bcryptjs.compare(password, administrator.passwordHash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { 
            administrator,
        }
    }
}