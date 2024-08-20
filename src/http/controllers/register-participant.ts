import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { ParticipantUseCase } from "@/use-cases/register-participant"
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository"
import { UserAlreadyExixstsError } from "@/use-cases/errors/user-already-exists"
import { InvalidCpfError } from "@/use-cases/errors/invalid-cpf"

export async function participant(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),

        cpf: z.string().optional(),
        institution: z.string().optional(),
        state: z.string().optional(),
        academicBackground: z.string().optional(),
    })

    const {name, cpf, email, institution, state, academicBackground, password } = registerBodySchema.parse(request.body)

    try {
        const prismaParticipantRepository = new PrismaParticipantRepository()
        const participantUseCase = new ParticipantUseCase(prismaParticipantRepository)

        await participantUseCase.handle({
            name,
            cpf,
            email,
            institution,
            state,
            academicBackground,
            password,
        })
    }catch(err){
        if(err instanceof UserAlreadyExixstsError){
            return reply.status(409).send({message: err.message})
        }
        if(err instanceof InvalidCpfError){
            return reply.status(409).send({message: err.message})
        }
        
        throw err
    }

    return reply.status(201).send()
    }