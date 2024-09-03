import { expect, describe, it } from 'vitest'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryAdministratorsRepository } from '@/repositories/in-memory/in-memory-administrator-repository'
import { AuthenticateAdministratorUseCase } from './authenticate-administrator'

describe('Authenticate administrator use case', () => {
    it('should be able to authenticate', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const sut = new AuthenticateAdministratorUseCase(administratorRepository)

        await administratorRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6),
            cpf: '123.456.789-00',
            institution: 'Universidade Federal do Rio Grande do Norte',
            city: 'Natal',
            state: 'RN',
            jobTitle: 'Engenheiro de Software',
            academicBackground: 'Engenharia de Software'
        })

        const { administrator } = await sut.handle({
            email: 'dave@gmail.com',
            password: '123456'
        })

        expect(administrator.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const sut = new AuthenticateAdministratorUseCase(administratorRepository)

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const administratorRepository = new InMemoryAdministratorsRepository()
        const sut = new AuthenticateAdministratorUseCase(administratorRepository)

        await administratorRepository.create({
            name: 'Davidson Oliveira',
            email: 'dave@gmail.com',
            passwordHash: await bcryptjs.hash('123456', 6),
            cpf: '123.456.789-00',
            institution: 'UFRN',
            city: 'Natal',
            state: 'RN',
            jobTitle: 'Engenheiro de Software',
            academicBackground: 'Engenharia de Software'
        })

        expect(() => 
            sut.handle({
                email: 'dave@gmail.com',
                password: '123123'
            })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
