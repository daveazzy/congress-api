import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeEventAccreditationRegisterUseCase } from '@/use-cases/factories/make-event-accreditation-use-case';

// Definindo os tipos possíveis de parâmetros na URL
type AttendanceParams = {
  Params: {
    eventId?: string;
    speakerId?: string;
  }
}

// Definindo o schema do body
const attendanceSchema = z.object({
  participantId: z.string().nonempty('Participant ID is required'),
  type: z.enum(['EVENT', 'SPEAKER'], {
    required_error: 'Attendance type is required',
    invalid_type_error: 'Type must be either EVENT or SPEAKER'
  })
});

export async function registerAttendance(
  request: FastifyRequest<AttendanceParams>,
  reply: FastifyReply
) {
  try {
    // Validar o body da requisição
    const { participantId, type } = attendanceSchema.parse(request.body);

    // Extrair IDs dos parâmetros
    const { eventId, speakerId } = request.params;

    console.log(speakerId)

    // Validar se os IDs correspondem ao tipo de presença
    if (type === 'EVENT' && !eventId) {
      return reply.status(400).send({ 
        error: 'Event ID is required when registering event attendance' 
      });
    }

    if (type === 'SPEAKER' && !speakerId) {
      return reply.status(400).send({ 
        error: 'Speaker ID is required when registering speaker attendance' 
      });
    }

    // Converter speakerId para número se existir
    const speakerIdNumber = speakerId ? parseInt(speakerId) : undefined;

    const registerAttendanceUseCase = makeEventAccreditationRegisterUseCase();
    
    const attendance = await registerAttendanceUseCase.execute({
      participantId,
      type,
      eventId: type === 'EVENT' ? eventId : undefined,
      speakerId: type === 'SPEAKER' ? speakerIdNumber : undefined,
    });

    return reply.status(201).send(attendance);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ 
        error: 'Validation error', 
        details: error.errors 
      });
    }

    console.error('Error processing request:', error);
    return reply.status(500).send({ 
      error: 'Failed to register attendance' 
    });
  }
}