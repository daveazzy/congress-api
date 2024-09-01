import { Prisma, Administrator } from "@prisma/client";
import { AdministratorRepository } from "../administrator-repository";

export class InMemoryAdministratorsRepository implements AdministratorRepository {
    public items: Administrator[] = []

    async findByEmail(email: string) {
        const administrator = this.items.find(item => item.email === email)

        if (!administrator) {
            return null
        }

        return administrator
    }

    async create(data: Prisma.AdministratorCreateInput) {
        const administrator = {
            id: `admin-${this.items.length + 1}`,
            name: data.name,
            cpf: data.cpf ?? null,
            email: data.email,
            institution: data.institution ?? null,
            city: data.city ?? null,
            state: data.state ?? null,
            academicBackground: data.academicBackground ?? null,
            jobTitle: data.jobTitle ?? null,
            passwordHash: data.passwordHash,
            createdAt: new Date(),
        }

        this.items.push(administrator)

        return administrator
    }
}
