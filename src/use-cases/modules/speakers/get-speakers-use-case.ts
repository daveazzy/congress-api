import { SpeakerRepository } from "./repositories/speakers-repository";
import { Speaker } from "@prisma/client";

interface GetSpeakersUseCaseRequest {
  congressId: string;
}

interface SpeakerWithCategoryName extends Speaker {
  categoryName?: string; 
}

export class GetSpeakersUseCase {
  constructor(private speakerRepository: SpeakerRepository) {}

  async execute({ congressId }: GetSpeakersUseCaseRequest): Promise<SpeakerWithCategoryName[]> {
    const speakers = await this.speakerRepository.findByCongressId(congressId);
    return speakers.map(speaker => ({
      ...speaker,
      categoryName: speaker.category?.name || "Categoria não encontrada" 
    }));
  }
}

