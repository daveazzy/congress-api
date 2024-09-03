import { PrismaAdministratorRepository } from "@/repositories/prisma/prisma-administrator-repository"
import { AdministratorUseCase } from "../register-administrator"

export function makeAdministratorRegisterUseCase(){
    const prismaAdministratorRepository = new PrismaAdministratorRepository()
    const administratorUseCase = new AdministratorUseCase(prismaAdministratorRepository)

    return administratorUseCase
}