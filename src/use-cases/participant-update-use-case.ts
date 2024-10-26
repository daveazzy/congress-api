import { ParticipantsRepository } from "@/repositories/participants-repository";

interface UpdateParticipantRequest {
    id: string;  
    name?: string;
    email?: string;
    institution?: string;
    state?: string;
    academicBackground?: string;
    photoUri?: string;
}

export class ParticipantUpdateUseCase {
    constructor(private participantsRepository: ParticipantsRepository) {}

    async handle({
        id,
        name,
        email,
        institution,
        state,
        academicBackground,
        photoUri,
    }: UpdateParticipantRequest): Promise<void> {
        const participant = await this.participantsRepository.findById(id);

        if (!participant) {
            throw new Error("Participant not found");
        }

        const updateData: Record<string, string | undefined> = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (institution) updateData.institution = institution;
        if (state) updateData.state = state;
        if (academicBackground) updateData.academicBackground = academicBackground;
        if (photoUri) updateData.photoUri = photoUri;

        await this.participantsRepository.update(id, updateData);
    }
}
