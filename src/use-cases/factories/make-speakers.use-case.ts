import { PrismaSpeakerRepository } from "../modules/speakers/repositories/prisma/prisma-speakers-repository";
import { SpeakerUseCase } from "../modules/speakers/speakers-use-case";

export function makeSpeakerUseCase (){
    const prismaSpeakerRepository = new PrismaSpeakerRepository()
    const speakerUseCase = new SpeakerUseCase(prismaSpeakerRepository)

    return speakerUseCase
}