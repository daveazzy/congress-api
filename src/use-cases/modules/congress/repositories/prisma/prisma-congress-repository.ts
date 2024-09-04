import { prisma } from '@/lib/prisma'
import { Congress, Prisma } from '@prisma/client'
import { CongressRepository } from '../congress-repository'

export class PrismaCongressRepository implements CongressRepository {
    async create(data: Prisma.CongressCreateInput): Promise<Congress> {
        const event = await prisma.congress.create({
            data
        })
        return event
    }

    async findByName(name: string): Promise<Congress | null> {
        const event = await prisma.congress.findUnique({
            where: {
                name
            }
        })
        return event
    }
}
