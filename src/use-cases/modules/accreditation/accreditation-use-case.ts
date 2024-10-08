import { AccreditationRepository } from "./repositories/accreditation-repository";

interface CreateAccreditationRequest {
    participantId: string;
    congressId: string;
    paymentType: string;
}

interface CreateAccreditationResponse {
    id: string;
    participantId: string;
    congressId: string;
    paymentType: string;
    isValid: boolean;
    createdAt: Date;
}

interface CreateAccreditationUseCase {
    execute(request: CreateAccreditationRequest): Promise<CreateAccreditationResponse>;
}

export class CreateAccreditationService implements CreateAccreditationUseCase {
    constructor(private accreditationRepository: AccreditationRepository) {}

    async execute(request: CreateAccreditationRequest): Promise<CreateAccreditationResponse> {
        const { participantId, congressId, paymentType } = request;

        if (!participantId || !congressId || !paymentType) {
            throw new Error("Todos os campos obrigatórios devem ser fornecidos.");
        }

        const accreditation = await this.accreditationRepository.create({
            participant: { connect: { id: participantId } },
            congress: { connect: { id: congressId } },
            paymentType,
            isValid: true,
        });

        return {
            id: accreditation.id,
            participantId: accreditation.participantId,
            congressId: accreditation.congressId,
            paymentType: accreditation.paymentType,
            isValid: accreditation.isValid,
            createdAt: accreditation.createdAt,
        };
    }
}
