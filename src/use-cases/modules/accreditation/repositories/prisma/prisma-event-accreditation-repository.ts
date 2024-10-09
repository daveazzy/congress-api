import { Attendance, Prisma } from "@prisma/client";
import { EventAccreditationRepository } from "../event-accreditation-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAttendanceRepository implements EventAccreditationRepository {
    async create(data: Prisma.AttendanceCreateInput): Promise<Attendance> {
        try {
            const existingAttendance = await prisma.attendance.findUnique({
                where: {
                    participantId_eventId: {
                        participantId: data.participant.connect?.id || "",
                        eventId: data.event.connect?.id || "",
                    },
                },
            });

            if (existingAttendance) {
                throw new Error("Este participante já registrou presença para este evento.");
            }
            const attendance = await prisma.attendance.create({
                data,
            });

            return attendance;
        } catch (error) {
            console.error("Erro ao criar registro de presença:", error);
            throw new Error("Não foi possível criar o registro de presença.");
        }
    }

    async findByParticipantAndEvent(participantId: string, eventId: string): Promise<Attendance | null> {
        return prisma.attendance.findUnique({
            where: {
                participantId_eventId: {
                    participantId,
                    eventId,
                },
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
        });
    }

    async findAllAttendancesForEvent(eventId: string): Promise<Attendance[]> {
        return prisma.attendance.findMany({
            where: {
                eventId,
            },
        });
    }
}


