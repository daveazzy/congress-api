import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";
import { administrator } from "./controllers/register-administrator";
import { reviewer } from "./controllers/register-reviewer";
import { authenticateParticipant } from "./controllers/authenticate-participants";
import { authenticateAdministrator } from "./controllers/authenticate-administrator";
import { authenticateReviewer } from "./controllers/authenticate-reviewer";

export async function appRoutes(app: FastifyInstance) {
    // register routes
    app.post('/participants', participant)
    app.post('/administrators', administrator)
    app.post('/reviewer', reviewer)

    //authenticate routes
    app.post('/participantSessions', authenticateParticipant)
    app.post('/administratorSessions', authenticateAdministrator)
    app.post('/reviewerSessions', authenticateReviewer)
    
}