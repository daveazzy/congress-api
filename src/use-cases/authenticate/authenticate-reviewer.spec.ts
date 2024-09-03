import { expect, describe, it } from 'vitest'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryReviewersRepository } from '@/repositories/in-memory/in-memory-reviewer-repository'
import { AuthenticateReviewerUseCase } from './authenticate-reviewer'


describe('Authenticate administrator use case', () => {
    it('should be able to authenticate', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const sut = new AuthenticateReviewerUseCase(reviewerRepository)

        await reviewerRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6),
            cpf: '123.456.789-00',
            institution: 'Universidade Federal do Rio Grande do Norte',
            city: 'Natal',
            state: 'RN',
            academicBackground: 'Engenharia de Software'
        })

        const { reviewer } = await sut.handle({
            email: 'dave@gmail.com',
            password: '123456'
        })

        expect(reviewer.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const sut = new AuthenticateReviewerUseCase(reviewerRepository)

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const sut = new AuthenticateReviewerUseCase(reviewerRepository)

        await reviewerRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6),
            cpf: '123.456.789-00',
            institution: 'UFRN',
            city: 'Natal',
            state: 'RN',
            academicBackground: 'Engenharia de Software'
        })

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
