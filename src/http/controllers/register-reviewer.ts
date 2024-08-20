import { FastifyRequest, FastifyReply } from "fastify";
import {z}from 'zod';
import { ReviewerUseCase } from "@/use-cases/register-reviewer";
import { PrismaReviewerRepository } from "@/repositories/prisma/prisma-reviewer-repository";
import { UserAlreadyExixstsError } from "@/use-cases/errors/user-already-exists";
import { InvalidCpfError } from "@/use-cases/errors/invalid-cpf";

export async function reviewer(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        institution: z.string(),
        city: z.string(),
        state: z.string(),
        academicBackground: z.string(),
        password: z.string().min(6)
    })

    const {name, cpf, email, institution, city, state, academicBackground, password} = registerBodySchema.parse(request.body)

    try {
        const prismaReviewerRepository = new PrismaReviewerRepository()
        const reviewerUseCase = new ReviewerUseCase(prismaReviewerRepository)

        await reviewerUseCase.handle({
            name,
            cpf,
            email, 
            institution, 
            city,
            state,
            academicBackground,
            password
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