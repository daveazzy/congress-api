import { expect, describe, it } from 'vitest'
import { ParticipantUseCase } from './register-participant'
import { compare } from 'bcryptjs'
import { InMemoryParticipantsRepository } from '@/repositories/in-memory/in-memory-participants-repositories'
import { UserAlreadyExixstsError } from './errors/user-already-exists'

describe('Register participant use case', () => {
    it('should be able to register', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const participantUseCase = new ParticipantUseCase(participantRepository)

        const { participant } = await participantUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            state: 'RN',
            academicBackground: "Engenhero de Software",
            password: '123456'
        })

        expect(participant.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const participantUseCase = new ParticipantUseCase(participantRepository)

        const { participant } = await participantUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            state: 'RN',
            academicBackground: "Engenhero de Software",
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            participant.passwordHash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const participantRepository = new InMemoryParticipantsRepository()
        const participantUseCase = new ParticipantUseCase(participantRepository)

        const email = 'dave@gmail.com'

        await participantUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email,
            institution: "UFRN",
            state: 'RN',
            academicBackground: "Engenhero de Software",
            password: '123456'
        })

        await expect(() =>
            participantUseCase.handle({
                name: 'Davidson Oliveira',
                cpf: '15366102081',
                email,
                institution: "UFRN",
                state: 'RN',
                academicBackground: "Engenhero de Software",
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExixstsError)
    })
})