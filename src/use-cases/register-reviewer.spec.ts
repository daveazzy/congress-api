import { expect, describe, it } from 'vitest'
import { ReviewerUseCase } from './register-reviewer'
import { compare } from 'bcryptjs'
import { InMemoryReviewersRepository } from '@/repositories/in-memory/in-memory-reviewer-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register reviewer use case', () => {
    it('should be able to register', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const reviewerUseCase = new ReviewerUseCase(reviewerRepository)

        const { reviewer } = await reviewerUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            password: '123456'
        })

        expect(reviewer.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const reviewerUseCase = new ReviewerUseCase(reviewerRepository)

        const { reviewer } = await reviewerUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            reviewer.passwordHash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const reviewerRepository = new InMemoryReviewersRepository()
        const reviewerUseCase = new ReviewerUseCase(reviewerRepository)

        const email = 'dave@gmail.com'

        await reviewerUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email,
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            password: '123456'
        })

        await expect(() =>
            reviewerUseCase.handle({
                name: 'Davidson Oliveira',
                cpf: '15366102081',
                email,
                institution: "UFRN",
                city: 'Natal',
                state: 'RN',
                academicBackground: "Engenheiro de Software",
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
