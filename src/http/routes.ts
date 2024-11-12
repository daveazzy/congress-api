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
import { createAccreditation } from './controllers/modules/accreditation';
import { registerAttendance } from './controllers/modules/attendance';
import { updateParticipantProfile } from './controllers/update-participant';
import { getSpeakers } from './controllers/modules/get-speakers';
import { deleteParticipant } from './controllers/delete-participant';
import { getUserEmail } from './controllers/get-email';
import { requestPasswordReset } from './controllers/reset-participant-pass-reset';
import { resetPassword } from './controllers/participant-reset-pass';
import { exportParticipantsToPDF } from '@/credenciads/pdf';

export async function appRoutes(app: FastifyInstance) {

    // Register routes
    app.post('/participants', participant);
    app.post('/administrators', administrator);
    app.post('/reviewer', reviewer);

    app.post('/password/forgot', requestPasswordReset)

    app.post('/password/verify', resetPassword)

    app.delete('/participants/delete/:id', deleteParticipant);
    app.post('/participants/email', getUserEmail);

    app.patch('/updateParticipantProfile', updateParticipantProfile);

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

    app.get('/speakers/:congressId', getSpeakers);

    // accreditation routes
    app.post('/congresses/:congressId/accreditations', createAccreditation);
    app.post(
        '/attendance/event/:eventId',
        registerAttendance
      );
    
      // Rota para registrar presença em palestra
      app.post(
        '/attendance/speaker/:speakerId',
        registerAttendance
      );


      app.get('/participants/pdf', async (request, reply) => {
        try {
          const pdfBytes = await exportParticipantsToPDF();
          reply.header('Content-Type', 'application/pdf');
          reply.header('Content-Disposition', 'attachment; filename="ParticipantesCredenciados.pdf"');
          reply.send(pdfBytes);
        } catch {
          reply.status(500).send("Erro ao gerar PDF");
        }
      });
      

}