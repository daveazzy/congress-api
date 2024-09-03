import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { PrismaReviewerRepository } from "@/repositories/prisma/prisma-reviewer-repository"
import { AuthenticateReviewerUseCase } from "@/use-cases/authenticate/authenticate-reviewer"

export async function authenticateReviewer(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaReviewerRepository = new PrismaReviewerRepository()
        const authenticateReviewerUseCase = new AuthenticateReviewerUseCase(prismaReviewerRepository)

        await authenticateReviewerUseCase.handle({
            email,
            password,
        })
    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message})
        }
        
        throw err
    }

    return reply.status(200).send()
    }