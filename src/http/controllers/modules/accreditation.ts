import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeAccreditationRegisterUseCase } from '@/use-cases/factories/make-accreditation-use-case';

interface AccreditationParams {
    congressId: string;
}

export async function createAccreditation(
    request: FastifyRequest<{ Params: AccreditationParams }>,
    reply: FastifyReply
) {
    try {
        const accreditationBodySchema = z.object({
            participantId: z.string(),
            paymentType: z.string(),
        });

        const { congressId } = request.params;

        if (!congressId) {
            return reply.status(400).send({ error: 'Congress ID is required' });
        }

        const { participantId, paymentType } = accreditationBodySchema.parse(request.body);

        const accreditationService = makeAccreditationRegisterUseCase();

        const accreditation = await accreditationService.execute({
            participantId,
            congressId,
            paymentType,
        });

        return reply.status(201).send(accreditation);
    } catch (error) {
        console.error('Error processing request:', error);
        return reply.status(500).send({ message: 'Failed to process the accreditation request' });
    }
}
