import { CongressAlreadyExistsError } from "@/use-cases/errors/congress-already-exists";
import { makeCongressRegisterUseCase } from "@/use-cases/factories/make-congress-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createCongress(request: FastifyRequest, reply: FastifyReply){
    const congressBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        knowledgeArea: z.string(),
        city: z.string(),
        location: z.string(),
        startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid startDate format",
        }),
        endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid endDate format",
        }),
    });

    const {
        name,
        description,
        knowledgeArea,
        city,
        location,
        startDate,
        endDate
    } = congressBodySchema.parse(request.body)

    const administratorId = request.user.sub.toString()

    try{
        const createCongressUseCase = makeCongressRegisterUseCase()

        await createCongressUseCase.handle({
            name,
            description,
            knowledgeArea,
            city,
            location,
            startDate,
            endDate,
        }, administratorId)

        return reply.status(201).send()
    }catch(err){
        if(err instanceof CongressAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
}