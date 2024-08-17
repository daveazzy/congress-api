import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";

export async function appRoutes(app: FastifyInstance) {
    app.post('/participants', participant)
}