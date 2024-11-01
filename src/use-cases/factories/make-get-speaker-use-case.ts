import { GetSpeakersUseCase } from "../modules/speakers/get-speakers-use-case";
import { PrismaSpeakerRepository } from "../modules/speakers/repositories/prisma/prisma-speakers-repository";

export function makeGetSpeakersUseCase() {
  const prismaSpeakerRepository = new PrismaSpeakerRepository();
  const getSpeakersUseCase = new GetSpeakersUseCase(prismaSpeakerRepository);

  return getSpeakersUseCase;
}
