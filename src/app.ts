import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "fastify-multipart";

export const app = fastify();

app.register(fastifyMultipart)

const publicRoutes = [
    '/administrator',
    '/participants',
    '/reviewer',
    '/me', 
    '/participantSessions',
    '/password/forgot',
    '/password/verify',
    '/participants/delete/:id',
    '/speakers/:congressId',
    '/congresses/:congressId/accreditations',
    '/attendance/event/:eventId',
    '/attendance/speaker/:speakerId',
    '/participants/pdf'
]

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.addHook('onRequest', async (request, reply) => {
    const routeUrl = request.routeOptions?.url;
    if (routeUrl && !publicRoutes.some(route => routeUrl.startsWith(route))) {
        try {
            request.user = await request.jwtVerify();
        } catch (err) {
            reply.status(401).send({ message: 'Unauthorized' });
        }
    }
})

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError){
        return reply
            .status(400)
            .send({message: 'Validation error.', issues: error.format()})
    }

    if (env.NODE_ENV !== 'production'){
        console.error(error)
    }

    return reply.status(500).send('Internal server error.')
})

