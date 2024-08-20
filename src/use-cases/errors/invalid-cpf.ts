export class InvalidCpfError extends Error {
    constructor(){
        super('CPF inválido')
    }
}