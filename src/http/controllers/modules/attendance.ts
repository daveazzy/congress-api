import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeEventAccreditationRegisterUseCase } from '@/use-cases/factories/make-event-accreditation-use-case';

export async function registerAttendance(
    request: FastifyRequest<{ Params: { eventId: string } }>,
    reply: FastifyReply
) {
    const participantIdSchema = z.object({
        participantId: z.string().nonempty("Participant ID is required"),
    });

    try {
        const { eventId } = request.params;

        if (!eventId) {
            return reply.status(400).send({ error: 'Event ID is required' });
        }

        const { participantId } = participantIdSchema.parse(request.body);

        const registerAttendanceUseCase = makeEventAccreditationRegisterUseCase();
        const attendance = await registerAttendanceUseCase.execute(participantId, eventId);

        return reply.status(201).send(attendance);
    } catch (error) {
        console.error('Error processing request:', error);
        return reply.status(500).send({ message: 'Failed to register attendance' });
    }
}


