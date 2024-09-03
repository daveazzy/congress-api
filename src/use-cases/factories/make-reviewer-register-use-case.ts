import { PrismaReviewerRepository } from "@/repositories/prisma/prisma-reviewer-repository"
import { ReviewerUseCase } from "../register-reviewer"


export function makeReviewerRegisterUseCase(){
    const prismaReviewerRepository = new PrismaReviewerRepository()
    const reviewerUseCase = new ReviewerUseCase(prismaReviewerRepository)

    return reviewerUseCase
}