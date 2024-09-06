import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeSpeakerUseCase } from '@/use-cases/factories/make-speakers.use-case';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { randomUUID } from 'crypto';

const pump = promisify(pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SpeakerParams {
    congressId: string;
}

export async function speaker(request: FastifyRequest<{ Params: SpeakerParams }>, reply: FastifyReply) {
    try {
        if (!request.isMultipart()) {
            return reply.status(400).send({ error: 'Request must be multipart/form-data' });
        }

        const speakerBodySchema = z.object({
            name: z.string(),
            institution: z.string(),
            presentationTitle: z.string(),
            date: z.string(), 
            startTime: z.string(),
            endTime: z.string(),
            location: z.string(),
        });

        let photoUri: string | undefined;
        let formData: Record<string, string> = {};

        const administratorId = request.user.sub.toString();

        const { congressId } = request.params;

        if (!congressId) {
            return reply.status(400).send({ error: 'Congress ID is required' });
        }

        const uploadDir = path.join(__dirname, '..', 'uploads');

        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        for await (const part of request.parts()) {
            if (part.file) {
                const filename = `${randomUUID()}-${part.filename}`;
                const filepath = path.join(uploadDir, filename);

                await pump(part.file, createWriteStream(filepath));

                photoUri = `/uploads/${filename}`;
            } else if (part.fieldname) {
                if ('value' in part) {
                    const value = part.value as string;
                    formData[part.fieldname] = value;
                }
            }
        }

        const { name, institution, presentationTitle, date, startTime, endTime, location } = speakerBodySchema.parse(formData);

        if (!photoUri) {
            return reply.status(400).send({ error: 'File upload is required' });
        }

        const speakerUseCase = makeSpeakerUseCase();
        await speakerUseCase.handle({
            name,
            institution,
            photoUri,
            presentationTitle,
            date: new Date(date),
            startTime,
            endTime,
            location,
            congressId,
            administratorId
        });

        return reply.status(201).send();
    } catch (error) {
        console.error('Error processing request:', error);
        return reply.status(500).send({ message: 'Failed to process the form data'});
    }
}
