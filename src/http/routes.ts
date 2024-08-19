import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";
import { coordinator } from "./controllers/register-coordinator";
import { professor } from "./controllers/register-professor";

export async function appRoutes(app: FastifyInstance) {
    app.post('/participants', participant)

    app.post('/coordinators', coordinator)

    app.post('/professors', professor)
}