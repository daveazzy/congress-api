import { Prisma, Speaker } from "@prisma/client";
import { SpeakerRepository } from "../speakers-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSpeakerRepository implements SpeakerRepository {
  async create(data: Prisma.SpeakerCreateInput) {
    const speaker = await prisma.speaker.create({
      data,
    });

    return speaker;
  }

  async findByCongressId(congressId: string): Promise<(Speaker & { category: { name: string } })[]> {
    const speakers = await prisma.speaker.findMany({
      where: {
        congressId: congressId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  
    return speakers;
  }
  
}
