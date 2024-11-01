import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeParticipantUpdateUseCase } from "@/use-cases/factories/make-participant-update-use-case";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";
import { prisma } from "@/lib/prisma";

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateParticipantProfile(request: FastifyRequest, reply: FastifyReply) {
    const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        institution: z.string().optional(),
        state: z.string().optional(),
        academicBackground: z.string().optional(),
    });

    let photoUri: string | undefined;
    const parsedBody: Record<string, string> = {};

    if (request.isMultipart()) {
        console.log("Requisição multipart detectada");
        for await (const part of request.parts()) {
            if ((part as any).file) {
                if ((part as any).fieldname === "photoUri") {
                    console.log("Processando imagem");
                    const id = String(request.user?.sub);
                    if (!id) {
                        return reply.status(401).send({ message: "Acesso não autorizado" });
                    }
    
                    const currentParticipant = await prisma.participant.findUnique({
                        where: { id },
                        select: { photoUri: true },
                    });
    
                    if (currentParticipant?.photoUri) {
                        const oldPath = currentParticipant.photoUri.replace(
                            `${supabaseUrl}/storage/v1/object/public/profile/participants/`,
                            ""
                        );
                        const { error: deleteError } = await supabase.storage.from("profile").remove([oldPath]);
    
                        if (deleteError) {
                            console.error("Erro ao excluir a imagem antiga:", deleteError);
                            return reply.status(500).send({ message: "Falha ao excluir a imagem antiga", error: deleteError.message });
                        }
                    }
    
                    const filename = `${Date.now()}-${(part as any).filename}`;
                    const { data, error } = await supabase.storage
                        .from("profile")
                        .upload(`participants/${filename}`, (part as any).file, {
                            contentType: (part as any).mimetype,
                            duplex: "half",
                        });
    
                    if (error) {
                        console.error("Erro ao fazer upload do arquivo:", error);
                        return reply.status(500).send({ message: "Falha ao fazer upload do arquivo" });
                    }
                    photoUri = `${supabaseUrl}/storage/v1/object/public/profile/participants/${filename}`;
                }
            } else {
                parsedBody[(part as any).fieldname] = (part as any).value;
            }
        }
    } else {
        console.error("A requisição não é multipart");
        return reply.status(400).send({ message: "A requisição não é multipart" });
    }
    
    console.log("Dados para atualização:", parsedBody, "URL da foto:", photoUri);
    
    try {
        const validatedData = updateBodySchema.parse(parsedBody);
        const id = String(request.user?.sub);
        if (!id) {
            return reply.status(401).send({ message: "Acesso não autorizado" });
        }
    
        const updateParticipantUseCase = makeParticipantUpdateUseCase();
        await updateParticipantUseCase.handle({
            id: id,
            ...validatedData,
            photoUri: photoUri,
        });
    } catch (err) {
        console.error("Erro ao atualizar perfil:", err);
        return reply.status(500).send({
            message: "Falha ao atualizar perfil",
            error: (err as Error).message,
        });
    }
    
    return reply.status(200).send({ message: "Perfil atualizado com sucesso" });
    
    
    
    
}