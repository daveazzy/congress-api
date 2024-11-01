import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaParticipantRepository } from '@/repositories/prisma/prisma-participant-repository';

export async function getUserEmail(request: FastifyRequest, reply: FastifyReply) {
    const emailSchema = z.object({
        email: z.string().email(),
    });

    const { email } = emailSchema.parse(request.body);

    const prismaParticipantRepository = new PrismaParticipantRepository();

    const participant = await prismaParticipantRepository.findByEmail(email);

    if (!participant) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
    }

    return reply.status(200).send({ email: participant.email });
}
