import { FastifyInstance } from "fastify";
import { participant } from "./controllers/register-participant";
import { administrator } from "./controllers/register-administrator";
import { reviewer } from "./controllers/register-reviewer";
import { authenticateParticipant } from "./controllers/authenticate-participants";
import { authenticateAdministrator } from "./controllers/authenticate-administrator";
import { authenticateReviewer } from "./controllers/authenticate-reviewer";
import { profile } from "./controllers/authenticated/profile";
import { createCongress } from "./controllers/modules/create-congress";

export async function appRoutes(app: FastifyInstance) {
    // register routes
    app.post('/participants', participant)
    app.post('/administrators', administrator)
    app.post('/reviewer', reviewer)

    //authenticate routes
    app.post('/participantSessions', authenticateParticipant)
    app.post('/administratorSessions', authenticateAdministrator)
    app.post('/reviewerSessions', authenticateReviewer)

    // # authenticated
    app.get('/me', profile)

    app.post('/congresses', createCongress)
    
}