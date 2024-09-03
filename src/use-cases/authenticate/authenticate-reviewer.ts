import { ReviewerRepository } from "@/repositories/reviewer-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { Reviewer } from "@prisma/client";
import bcryptjs from 'bcryptjs'


interface AuthenticateReviewerUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateReviewerUseCaseResponse {
    reviewer: Reviewer
}



export class AuthenticateReviewerUseCase {
    constructor(private reviewerRepository: ReviewerRepository){}

    async handle({email, password}: AuthenticateReviewerUseCaseRequest): Promise<AuthenticateReviewerUseCaseResponse>{
        const reviewer = await this.reviewerRepository.findByEmail(email)

        if(!reviewer){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await bcryptjs.compare(password, reviewer.passwordHash)

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { 
            reviewer,
        }
    }
}