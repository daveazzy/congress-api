import { Prisma, Speaker } from "@prisma/client";
import { SpeakerRepository } from "../speakers-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSpeakerRepository implements SpeakerRepository{
    async create(data: Prisma.SpeakerCreateInput) {
        const speaker = await prisma.speaker.create({
            data
        })

        return speaker
    }

}