import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";
import { transporter } from "../../@mailer/mailer";
import jwt from 'jsonwebtoken';
import { env } from "@/env";

// Função para solicitar recuperação de senha
export async function requestPasswordReset(request: FastifyRequest, reply: FastifyReply) {
    const emailSchema = z.object({
        email: z.string().email(),
    });

    const { email } = emailSchema.parse(request.body);

    const prismaUserRepository = new PrismaParticipantRepository();
    const user = await prismaUserRepository.findByEmail(email);

    if (!user) {
        // Mensagem genérica para evitar vazamento de informações
        return reply.status(404).send({ message: "Usuário não encontrado." });
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: '1h' });

    try {
        await transporter.sendMail({
            from: 'noreply@redepdimat.org',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Seu código de recuperação de senha é: ${token}. Use este código para redefinir sua senha.`,
        });
        return reply.status(200).send({ message: "Código de recuperação enviado para o e-mail." });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return reply.status(500).send({ message: "Erro ao enviar o e-mail. Tente novamente mais tarde." });
    }
}