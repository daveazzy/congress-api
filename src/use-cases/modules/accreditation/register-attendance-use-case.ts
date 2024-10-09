import { Attendance } from "@prisma/client";
import { EventAccreditationRepository } from "./repositories/event-accreditation-repository";

export class RegisterAttendanceUseCase {
    constructor(private attendanceRepository: EventAccreditationRepository) {}

    async execute(participantId: string, eventId: string): Promise<Attendance> {
        const attendanceData = {
            participant: { connect: { id: participantId } },
            event: { connect: { id: eventId } },
            createdAt: new Date(),
        };

        return await this.attendanceRepository.create(attendanceData);
    }
}
