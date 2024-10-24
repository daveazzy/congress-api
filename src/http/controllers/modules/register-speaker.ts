import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeSpeakerUseCase } from '@/use-cases/factories/make-speakers.use-case';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { env } from '@/env';

const supabaseUrl =  env.SUPABASE_URL
const supabaseKey = env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
      categoryId: z.string()
    });

    let photoUri: string | undefined;
    let formData: Record<string, string> = {};
    const administratorId = request.user.sub.toString();
    const { congressId } = request.params;

    if (!congressId) {
      return reply.status(400).send({ error: 'Congress ID is required' });
    }

    for await (const part of request.parts()) {
      if (part.file) {
        const filename = `${randomUUID()}-${part.filename}`;
        const { data, error } = await supabase.storage
          .from('profile')
          .upload(`speakers/${filename}`, part.file, {
            contentType: part.mimetype 
          });

        if (error) {
          console.error('Error uploading file:', error);
          return reply.status(500).send({ message: 'Failed to upload file' });
        }

        photoUri = `${supabaseUrl}/storage/v1/object/public/your-bucket-name/speakers/${filename}`;
      } else if (part.fieldname) {
        if ('value' in part) {
          const value = part.value as string;
          formData[part.fieldname] = value;
        }
      }
    }

    const { name, institution, presentationTitle, date, startTime, endTime, location, categoryId } = speakerBodySchema.parse(formData);

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
      administratorId,
      categoryId
    });

    return reply.status(201).send();
  } catch (error) {
    console.error('Error processing request:', error);
    return reply.status(500).send({ message: 'Failed to process the form data' });
  }
}
