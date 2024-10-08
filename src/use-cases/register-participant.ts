import { ParticipantsRepository } from "@/repositories/participants-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { Participant } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CpfAlreadyExists } from "./errors/cpf-already-exists";
import { v4 as uuidv4 } from 'uuid'; 
import { validateCPF } from "./data-treatments/cpf-validator";

interface ParticipantUseCaseRequest {
    name: string;
    cpf?: string;
    email: string;
    institution?: string;
    state?: string;
    academicBackground?: string;
    password: string;
}

interface ParticipantUseCaseResponse {
    participant: Participant;
}

export class ParticipantUseCase {
    constructor(private participantsRepository: ParticipantsRepository) {}

    async handle({ name, email, password, academicBackground, cpf, institution, state }: ParticipantUseCaseRequest): Promise<ParticipantUseCaseResponse> {
        const passwordHash = await bcrypt.hash(password, 6);

        const userWithSameEmail = await this.participantsRepository.findByEmail(email);

        if(cpf){
            const IsCPFValid = await validateCPF(cpf)

            if(IsCPFValid == false){
                throw new Error('CPF inválido.')
            }
        }

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }


        const qrCodeToken = uuidv4(); 

        const participant = await this.participantsRepository.create({
            name,
            email,
            passwordHash,
            qrCodeToken,
            ...(cpf && { cpf }),
            ...(academicBackground && { academicBackground }),
            ...(institution && { institution }),
            ...(state && { state })
        });

        return {
            participant,
        };
    }
}
