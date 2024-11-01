import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";

export async function deleteParticipant(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    try {
        const prismaParticipantRepository = new PrismaParticipantRepository();
        
        const deletedParticipant = await prismaParticipantRepository.delete(id);

        if (!deletedParticipant) {
            return reply.status(404).send({ message: "Participant not found." });
        }

        return reply.status(204).send();
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: "An error occurred while deleting the participant." });
    }
}
