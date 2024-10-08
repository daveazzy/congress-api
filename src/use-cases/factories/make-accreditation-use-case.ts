import { CreateAccreditationService } from "../modules/accreditation/accreditation-use-case"
import { PrismaAccreditationRepository } from "../modules/accreditation/repositories/prisma/prisma-accreditation-repository"

export function makeAccreditationRegisterUseCase(){
    const prismaAccreditationRepository = new PrismaAccreditationRepository()
    const accreditationUseCase = new CreateAccreditationService(prismaAccreditationRepository)

    return accreditationUseCase
}