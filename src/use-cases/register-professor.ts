import { ProfessorRepository } from "@/repositories/professor-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExixstsError } from "./errors/user-already-exists";

interface professorUseCaseRequest {
    name: string,
    email: string,
    institution: string,
    jobTitle: string,
    password: string
}

export class ProfessorUseCase {
    constructor(private professorsRepository: ProfessorRepository) {}

    async handle({name, email, institution, jobTitle, password}: professorUseCaseRequest){
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.professorsRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExixstsError()
        }

        await this.professorsRepository.create({
            name,
            email,
            institution,
            jobTitle,
            passwordHash
        })
    }
}