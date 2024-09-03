import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';


import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeAdministratorRegisterUseCase } from "@/use-cases/factories/make-administrator-register-use-case";

export async function administrator(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        institution: z.string(),
        city: z.string(),
        state: z.string(),
        academicBackground: z.string(),
        jobTitle: z.string(),
        password: z.string().min(6)
    })

    const {name, cpf, email, institution, city, state, academicBackground, jobTitle, password} = registerBodySchema.parse(request.body)

    try {
        const registerAdministratorUseCase = makeAdministratorRegisterUseCase()

        await registerAdministratorUseCase.handle({
            name,
            cpf,
            email,
            institution,
            city,
            state,
            academicBackground,
            jobTitle,
            password
        })
    }catch(err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }

        throw err
    }

    return reply.status(201).send()
}