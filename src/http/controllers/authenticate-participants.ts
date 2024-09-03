import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository"
import { AuthenticateParticipantUseCase } from "@/use-cases/authenticate/authenticate-participant"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"

export async function authenticateParticipant(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaParticipantRepository = new PrismaParticipantRepository()
        const authenticateParticipantUseCase = new AuthenticateParticipantUseCase(prismaParticipantRepository)

        const { participant } = await authenticateParticipantUseCase.handle({
            email,
            password,
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: participant.id
            },
        })
        return reply.status(200).send({
            token
        })
    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message})
        }
        
        throw err
    }
    }