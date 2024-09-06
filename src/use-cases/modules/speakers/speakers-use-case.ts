import { SpeakerRepository } from "./repositories/speakers-repository";

interface speakerUseCaseRequest {
    name: string,
    institution: string,
    photoUri: string,
    presentationTitle: string,
    date: Date,
    startTime: string,
    endTime: string,
    location: string, 
    congressId: string,
    administratorId: string
}

export class SpeakerUseCase {
    constructor(private speakerRepository: SpeakerRepository){}

    async handle({
        name,
        institution,
        photoUri,
        presentationTitle,
        date,
        startTime,
        endTime,
        location,
        congressId,
        administratorId
    }: speakerUseCaseRequest){
        const speaker = await this.speakerRepository.create({
            name,
            institution,
            photoUri,
            presentationTitle,
            date,
            startTime,
            endTime,
            location,
            congress: {connect:{id: congressId}},
            administrator: {connect: {id: administratorId}}
        })

        return speaker
    }
}