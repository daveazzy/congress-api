import { FastifyInstance } from 'fastify';
import FastifyMultipart from 'fastify-multipart';
import path from 'path';
import fs from 'fs';

import { participant } from './controllers/register-participant';
import { administrator } from './controllers/register-administrator';
import { reviewer } from './controllers/register-reviewer';
import { authenticateParticipant } from './controllers/authenticate-participants';
import { authenticateAdministrator } from './controllers/authenticate-administrator';
import { authenticateReviewer } from './controllers/authenticate-reviewer';
import { profile } from './controllers/authenticated/profile';
import { createCongress } from './controllers/modules/create-congress';
import { registerForCongress } from './controllers/modules/participant-check-in';
import { submissionController } from './controllers/modules/submission';

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

    // Upload route
    app.post('/congress/:congressId/submission', async (request, reply) => {
        const data = await request.file();
        if (!data) {
            return reply.status(400).send({ message: "File not uploaded" });
        }

        const filePath = path.join(__dirname, './uploads', `${Date.now()}-${data.filename}`);
        const fileStream = fs.createWriteStream(filePath);
        data.file.pipe(fileStream);

        // Optional: process additional form data from `request.fields`

        return reply.status(201).send({ message: "File uploaded successfully", filePath });
    });
}
