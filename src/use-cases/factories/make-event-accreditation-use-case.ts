import { RegisterAttendanceUseCase } from "../modules/accreditation/register-attendance-use-case"
import { PrismaAttendanceRepository } from "../modules/accreditation/repositories/prisma/prisma-event-accreditation-repository"

export function makeEventAccreditationRegisterUseCase(){
    const prismaEventAccreditationRepository = new PrismaAttendanceRepository()
    const eventAccreditationUseCase = new RegisterAttendanceUseCase(prismaEventAccreditationRepository)

    return eventAccreditationUseCase
}