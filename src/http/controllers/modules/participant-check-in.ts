import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRegisterForCongressUseCase } from "@/use-cases/factories/make-register-for-congress-use-case";

export async function registerForCongress(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        participantId: z.string(),
        congressId: z.string(),
    });

    const { participantId, congressId } = registerBodySchema.parse(request.body);

    try {
        const registerForCongressUseCase = makeRegisterForCongressUseCase();

        await registerForCongressUseCase.handle({
            participantId,
            congressId,
        });
    } catch (err) {
        throw err;
    }

    return reply.status(201).send();
}
