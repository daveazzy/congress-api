import { CongressRepository } from "./repositories/congress-repository";
import { Congress } from "@prisma/client";
import { CongressAlreadyExistsError } from "@/use-cases/errors/congress-already-exists";

interface CreateCongressUseCaseRequest {
    name: string;
    description: string;
    knowledgeArea: string;
    city: string;
    location: string;
    startDate: string;
    endDate: string;
}

interface CreateCongressUseCaseResponse {
    congress: Congress;
}

export class CreateCongressUseCase {
    constructor(private congressRepository: CongressRepository) {}

    async handle({
        name,
        description,
        knowledgeArea,
        city,
        location,
        startDate,
        endDate,
    }: CreateCongressUseCaseRequest, administratorId: string): Promise<CreateCongressUseCaseResponse> {
        const existingCongress = await this.congressRepository.findByName(name);

        if (existingCongress) {
            throw new CongressAlreadyExistsError();
        }

        const congress = await this.congressRepository.create({
                name,
                description,
                knowledgeArea,
                city,
                location,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                administrator: { connect: { id: administratorId } },
        });

        return {
            congress,
        };
    }
}
