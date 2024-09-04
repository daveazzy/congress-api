import { CreateCongressUseCase } from "../modules/congress/create-congress-use-case"
import { PrismaCongressRepository } from "../modules/congress/repositories/prisma/prisma-congress-repository"

export function makeCongressRegisterUseCase(){
    const prismaCongressRepository = new PrismaCongressRepository()
    const congressUseCase = new CreateCongressUseCase(prismaCongressRepository)

    return congressUseCase
}