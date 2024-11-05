import { Attendance } from "@prisma/client";
import { EventAccreditationRepository } from "./repositories/event-accreditation-repository";

interface RegisterAttendanceRequest {
    participantId: string;
    type: 'EVENT' | 'SPEAKER';
    eventId?: string;
    speakerId?: number;
}

export class RegisterAttendanceUseCase {
    constructor(private attendanceRepository: EventAccreditationRepository) {}

    async execute({
        participantId,
        type,
        eventId,
        speakerId
    }: RegisterAttendanceRequest): Promise<Attendance> {
        // Validações
        if (type === 'EVENT') {
            if (!eventId) {
                throw new Error('Event ID is required for event attendance');
            }

            // Verifica se já existe presença para este evento
            const existingEventAttendance = await this.attendanceRepository
                .findByParticipantAndEvent(participantId, eventId);

            if (existingEventAttendance) {
                throw new Error('Participant already has attendance for this event');
            }

            return await this.attendanceRepository.create({
                participant: { connect: { id: participantId } },
                event: { connect: { id: eventId } },
                type: 'EVENT',
                createdAt: new Date(),
            });
        }

        if (type === 'SPEAKER') {
            if (!speakerId) {
                throw new Error('Speaker ID is required for speaker attendance');
            }

            // Verifica se já existe presença para esta palestra
            const existingSpeakerAttendance = await this.attendanceRepository
                .findByParticipantAndSpeaker(participantId, speakerId);

            if (existingSpeakerAttendance) {
                throw new Error('Participant already has attendance for this speaker session');
            }

            return await this.attendanceRepository.create({
                participant: { connect: { id: participantId } },
                speaker: { connect: { id: speakerId } },
                type: 'SPEAKER',
                createdAt: new Date(),
            });
        }

        throw new Error('Invalid attendance type');
    }
}