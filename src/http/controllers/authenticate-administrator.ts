import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { PrismaAdministratorRepository } from "@/repositories/prisma/prisma-administrator-repository"
import { AuthenticateAdministratorUseCase } from "@/use-cases/authenticate/authenticate-administrator"

export async function authenticateAdministrator(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password } = authenticateBodySchema.parse(request.body)

    try {
        const prismaAdministratorRepository = new PrismaAdministratorRepository()
        const authenticateAdministratorUseCase = new AuthenticateAdministratorUseCase(prismaAdministratorRepository)

        const { administrator } = await authenticateAdministratorUseCase.handle({
            email,
            password,
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: administrator.id,
            },
        }
    )
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