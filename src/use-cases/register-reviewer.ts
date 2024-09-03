import { ReviewerRepository } from "@/repositories/reviewer-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import bcrypt from 'bcryptjs'

interface reviewerUseCaseRequest {
    name: string,
    cpf: string,
    email: string,
    institution: string,
    city: string,
    state: string,
    academicBackground: string,
    password: string
}

export class ReviewerUseCase {
    constructor(private professorsRepository: ReviewerRepository) {}

    async handle({name, cpf, email, institution, city, state, academicBackground, password}: reviewerUseCaseRequest){
        const passwordHash = await bcrypt.hash(password, 6)

        const userWithSameEmail = await this.professorsRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const reviewer = await this.professorsRepository.create({
            name,
            cpf,
            email,
            institution,
            city,
            state,
            academicBackground,
            passwordHash
        })
        return{
            reviewer
        }
    }
}