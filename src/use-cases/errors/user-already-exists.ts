export class UserAlreadyExixstsError extends Error {
    constructor(){
        super('Email already exists')
    }
}