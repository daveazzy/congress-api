import { Prisma, Reviewer } from "@prisma/client";
import { ReviewerRepository } from "../reviewer-repository";

export class InMemoryReviewersRepository implements ReviewerRepository {
    public items: Reviewer[] = []

    async findByEmail(email: string) {
        const reviewer = this.items.find(item => item.email === email)

        if (!reviewer) {
            return null
        }

        return reviewer
    }

    async create(data: Prisma.ReviewerCreateInput) {
        const reviewer = {
            id: `reviewer-${this.items.length + 1}`,
            name: data.name,
            cpf: data.cpf ?? null,
            email: data.email,
            institution: data.institution ?? null,
            city: data.city ?? null,
            state: data.state ?? null,
            academicBackground: data.academicBackground ?? null,
            passwordHash: data.passwordHash,
            photoUri: data.photoUri ?? null,
            createdAt: new Date(),
        }

        this.items.push(reviewer)

        return reviewer
    }
}
