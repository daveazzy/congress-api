import { Attendance, Prisma } from "@prisma/client";
import { EventAccreditationRepository } from "../event-accreditation-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAttendanceRepository implements EventAccreditationRepository {
    async create(data: Prisma.AttendanceCreateInput): Promise<Attendance> {
        try {
            // Verifica se é presença em evento ou palestra
            if (data.type === 'EVENT') {
                const existingEventAttendance = await prisma.attendance.findFirst({
                    where: {
                        participantId: data.participant.connect?.id,
                        eventId: data.event?.connect?.id,
                        type: 'EVENT'
                    },
                });

                if (existingEventAttendance) {
                    throw new Error("Este participante já registrou presença para este evento.");
                }
            } else if (data.type === 'SPEAKER') {
                const existingSpeakerAttendance = await prisma.attendance.findFirst({
                    where: {
                        participantId: data.participant.connect?.id,
                        speakerId: data.speaker?.connect?.id,
                        type: 'SPEAKER'
                    },
                });

                if (existingSpeakerAttendance) {
                    throw new Error("Este participante já registrou presença para esta palestra.");
                }
            }

            const attendance = await prisma.attendance.create({
                data,
            });

            return attendance;
        } catch (error) {
            console.error("Erro ao criar registro de presença:", error);
            if (error instanceof Error) {
                throw error; // Re-throw se for um erro conhecido
            }
            throw new Error("Não foi possível criar o registro de presença.");
        }
    }

    async findByParticipantAndEvent(participantId: string, eventId: string): Promise<Attendance | null> {
        return prisma.attendance.findFirst({
            where: {
                participantId,
                eventId,
                type: 'EVENT'
            },
        });
    }

    async findByParticipantAndSpeaker(participantId: string, speakerId: number): Promise<Attendance | null> {
        return prisma.attendance.findFirst({
            where: {
                participantId,
                speakerId,
                type: 'SPEAKER'
            },
        });
    }

    async validateAttendance(attendanceId: string, validatedBy: string): Promise<Attendance> {
        return prisma.attendance.update({
            where: { id: attendanceId },
            data: {
                validatedAt: new Date(),
                validatedBy,
            },
        });
    }

    async findAllAttendancesForParticipant(participantId: string): Promise<Attendance[]> {
        return prisma.attendance.findMany({
            where: {
                participantId,
            },
            include: {
                event: true,
                speaker: true
            }
        });
    }

    async findAllAttendancesForEvent(eventId: string): Promise<Attendance[]> {
        return prisma.attendance.findMany({
            where: {
                eventId,
                type: 'EVENT'
            },
            include: {
                participant: true
            }
        });
    }

    async findAllAttendancesForSpeaker(speakerId: number): Promise<Attendance[]> {
        return prisma.attendance.findMany({
            where: {
                speakerId,
                type: 'SPEAKER'
            },
            include: {
                participant: true
            }
        });
    }
}