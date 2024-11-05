import { Attendance, Prisma } from "@prisma/client";

export interface EventAccreditationRepository {
    create(data: Prisma.AttendanceCreateInput): Promise<Attendance>;

    findByParticipantAndEvent(participantId: string, eventId: string): Promise<Attendance | null>;

    validateAttendance(attendanceId: string, validatedBy: string): Promise<Attendance>;

    findAllAttendancesForParticipant(participantId: string): Promise<Attendance[]>;
    
    findAllAttendancesForEvent(eventId: string): Promise<Attendance[]>;

    findByParticipantAndEvent(participantId: string, eventId: string): Promise<Attendance | null>;
    findByParticipantAndSpeaker(participantId: string, speakerId: number): Promise<Attendance | null>;
}
