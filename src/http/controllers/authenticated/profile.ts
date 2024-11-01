import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();

        const userId = String(request.user.sub);  

        const userProfile = await prisma.participant.findUnique({
            where: { id: userId }, 
            select: {
                id: true,
                name: true,
                cpf: true,
                academicBackground: true,
                institution: true,
                state: true,
                photoUri: true,
            },
        });

        if (!userProfile) {
            return reply.status(404).send({ message: "User not found" });
        }

        return reply.status(200).send(userProfile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return reply.status(500).send({ message: "Failed to fetch profile" });
    }
}

