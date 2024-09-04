export class CongressAlreadyExistsError extends Error {
    constructor(){
        super('Congress already exists.')
    }
}