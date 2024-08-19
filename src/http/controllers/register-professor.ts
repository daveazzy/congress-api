import { FastifyRequest, FastifyReply } from "fastify";
import {z}from 'zod';
import { ProfessorUseCase } from "@/use-cases/register-professor";
import { PrismaProfessorRepository } from "@/repositories/prisma/prisma-professor-repository";
import { UserAlreadyExixstsError } from "@/use-cases/errors/user-already-exists";

export async function professor(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        institution: z.string(),
        jobTitle: z.string(),
        password: z.string().min(6)
    })

    const {name, email, institution, jobTitle, password} = registerBodySchema.parse(request.body)

    try {
        const prismaProfessorRepository = new PrismaProfessorRepository()
        const professorUseCase = new ProfessorUseCase(prismaProfessorRepository)

        await professorUseCase.handle({
            name, 
            email,
            institution,
            jobTitle,
            password
        })
    }catch(err){
        if(err instanceof UserAlreadyExixstsError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }

    return reply.status(201).send()
}