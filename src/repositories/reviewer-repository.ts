import { Prisma, Reviewer } from "@prisma/client";

export interface ReviewerRepository {
    findByEmail(email: string): Promise <Reviewer | null>

    create(data: Prisma.ReviewerCreateInput): Promise<Reviewer>
}