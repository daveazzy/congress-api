import { FastifyInstance } from 'fastify';

import { participant } from './controllers/register-participant';
import { administrator } from './controllers/register-administrator';
import { reviewer } from './controllers/register-reviewer';
import { authenticateParticipant } from './controllers/authenticate-participants';
import { authenticateAdministrator } from './controllers/authenticate-administrator';
import { authenticateReviewer } from './controllers/authenticate-reviewer';
import { profile } from './controllers/authenticated/profile';
import { createCongress } from './controllers/modules/create-congress';
import { registerForCongress } from './controllers/modules/participant-check-in';
import { speaker } from './controllers/modules/register-speaker';

export async function appRoutes(app: FastifyInstance) {

    // Register routes
    app.post('/participants', participant);
    app.post('/administrators', administrator);
    app.post('/reviewer', reviewer);

    // Authenticate routes
    app.post('/participantSessions', authenticateParticipant);
    app.post('/administratorSessions', authenticateAdministrator);
    app.post('/reviewerSessions', authenticateReviewer);

    // Authenticated routes
    app.get('/me', profile);

    // Congress routes
    app.post('/congresses', createCongress);
    app.post('/register-for-congress', registerForCongress);

    app.post('/congresses/:congressId/speakers', speaker)
}
