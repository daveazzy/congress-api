import { Submission } from "@prisma/client"
import { SubmissionRepository } from "./repositories/submission-repository"

interface SubmissionUseCaseRequest {
    title: string
    abstract: string
    fileUrl: string
    status: string
    participantId: string
    congressId: string
}

interface SubmissionUseCaseResponse {
    submission: Submission
}

export class SubmissionUseCase {
    constructor(private submissionRepository: SubmissionRepository){}

    async handle({
        title, 
        abstract, 
        fileUrl, 
        status, 
        participantId, 
        congressId}: SubmissionUseCaseRequest): Promise <SubmissionUseCaseResponse>{
            const submission = await this.submissionRepository.create({
                title,
                abstract,
                fileUrl,
                status: 'Em avaliação',
                participant: {connect: {id: participantId}},
                congress: {connect: {id: congressId}}
            })

            return {
                submission
            }
        }

}