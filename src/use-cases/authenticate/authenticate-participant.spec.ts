import { expect, describe, it } from 'vitest'
import { InMemoryParticipantsRepository } from '@/repositories/in-memory/in-memory-participants-repositories'
import { AuthenticateParticipantUseCase } from './authenticate-participant'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Authenticate participant use case', () => {
    it('should be able to authenticate', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const sut = new AuthenticateParticipantUseCase(participantRepository)

        await participantRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6)
        })

        const { participant } = await sut.handle({
            email: 'dave@gmail.com',
            password: '123456'
        })

        expect(participant.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const sut = new AuthenticateParticipantUseCase(participantRepository)

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const sut = new AuthenticateParticipantUseCase(participantRepository)

        await participantRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6)
        })

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})