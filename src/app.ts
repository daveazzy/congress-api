import fastify from "fastify";
import { z } from 'zod'
import { prisma } from "./lib/prisma";

export const app = fastify();

app.post('/participants', async (request, reply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        institution: z.string(),
        password: z.string().min(6)
    })

    const {name, email, institution, password} = registerBodySchema.parse(request.body)

    await prisma.participant.create({
        data: {
            name,
            email,
            institution,
            passwordHash: password
        }
    })

    return reply.status(201).send()
    })

