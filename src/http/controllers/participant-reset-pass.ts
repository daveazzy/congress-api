import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from "@/env";

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
    const resetSchema = z.object({
        token: z.string(),
        newPassword: z.string().min(6),
    });

    const { token, newPassword } = resetSchema.parse(request.body);

    try {
        // Decodificar o token
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };

        const prismaUserRepository = new PrismaParticipantRepository();
        const user = await prismaUserRepository.findById(decoded.id);

        if (!user) {
            return reply.status(404).send({ message: "Usuário não encontrado." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prismaUserRepository.updatePassword(user.id, hashedPassword);

        return reply.status(200).send({ message: "Senha redefinida com sucesso." });
    } catch (error) {
        return reply.status(400).send({ message: "Token inválido ou expirado." });
    }
}
