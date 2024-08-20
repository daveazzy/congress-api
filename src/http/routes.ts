import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";
import { administrator } from "./controllers/register-administrator";
import { reviewer } from "./controllers/register-reviewer";

export async function appRoutes(app: FastifyInstance) {
    app.post('/participants', participant)

    app.post('/administrators', administrator)

    app.post('/test', reviewer)
}