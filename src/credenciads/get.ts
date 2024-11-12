import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAccreditedParticipants() {
  try {
    const accreditedParticipants = await prisma.accreditation.findMany({
      where: {
        isValid: true,
      },
      include: {
        participant: true, // Inclui informações dos participantes relacionados
      },
    });

    // Retorna apenas os dados dos participantes credenciados
    return accreditedParticipants.map(accreditation => accreditation.participant);
  } catch (error) {
    console.error("Erro ao buscar participantes credenciados:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
