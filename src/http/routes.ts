import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";
import { coordinator } from "./controllers/register-coordinator";

export async function appRoutes(app: FastifyInstance) {
    app.post('/participants', participant)

    app.post('/coordinators', coordinator)
}