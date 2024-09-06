import { Prisma, Speaker } from "@prisma/client";

export interface SpeakerRepository {
    create(data: Prisma.SpeakerCreateInput): Promise <Speaker>
}