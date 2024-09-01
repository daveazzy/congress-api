export class CpfAlreadyExists extends Error {
    constructor(){
        super('CPF is already in use.')
    }
}