import { expect, describe, it } from 'vitest'
import { AdministratorUseCase } from './register-administrator'
import { compare } from 'bcryptjs'
import { InMemoryAdministratorsRepository } from '@/repositories/in-memory/in-memory-administrator-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register administrator use case', () => {
    it('should be able to register', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const administratorUseCase = new AdministratorUseCase(administratorRepository)

        const { administrator } = await administratorUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            jobTitle: 'Coordinator',
            password: '123456'
        })

        expect(administrator.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const administratorUseCase = new AdministratorUseCase(administratorRepository)

        const { administrator } = await administratorUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email: 'dave@gmail.com',
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            jobTitle: 'Coordinator',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            administrator.passwordHash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const administratorUseCase = new AdministratorUseCase(administratorRepository)

        const email = 'dave@gmail.com'

        await administratorUseCase.handle({
            name: 'Davidson Oliveira',
            cpf: '15366102081',
            email,
            institution: "UFRN",
            city: 'Natal',
            state: 'RN',
            academicBackground: "Engenheiro de Software",
            jobTitle: 'Coordinator',
            password: '123456'
        })

        await expect(() =>
            administratorUseCase.handle({
                name: 'Davidson Oliveira',
                cpf: '15366102081',
                email,
                institution: "UFRN",
                city: 'Natal',
                state: 'RN',
                academicBackground: "Engenheiro de Software",
                jobTitle: 'Coordinator',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
