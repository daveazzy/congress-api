import { Congress, Prisma } from "@prisma/client";

export interface CongressRepository {
    create(data: Prisma.CongressCreateInput): Promise <Congress>
    
    findByName(title: string): Promise<Congress | null>
}