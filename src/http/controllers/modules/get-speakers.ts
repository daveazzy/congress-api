import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetSpeakersUseCase } from '@/use-cases/factories/make-get-speaker-use-case';

interface CongressParams {
  congressId: string;
}

export async function getSpeakers(request: FastifyRequest<{ Params: CongressParams }>, reply: FastifyReply) {
  try {
    const { congressId } = request.params;

    if (!congressId) {
      return reply.status(400).send({ error: 'Congress ID is required' });
    }

    const getSpeakersUseCase = makeGetSpeakersUseCase();
    const speakers = await getSpeakersUseCase.execute({ congressId });

    return reply.status(200).send(speakers);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    return reply.status(500).send({ message: 'Failed to fetch speakers' });
  }
}
