import validator from 'validator'
import { badRequest } from './http.js'

export const InvalidPassawordResponse = () => {
    return badRequest({
        error: 'Password must be between 6 and 20 characters and contain at least one special character',
    })
}

export const EmailAlreadyInUseResponse = () => {
    return badRequest({
        error: 'Invalid email or email already exists',
    })
}

export const invalidIdResponse = () => {
    return badRequest({
        error: 'The provided id is not valid.',
    })
}

export const checkPassowrdIsValid = (password) =>
    password.length < 6 ||
    password.length > 20 ||
    !/[!@#$%^&*()\-_+={}[\]|\\?<>.,;:]/.test(password)

export const checkEmailIsValid = (email) => validator.isEmail(email)

export const checkIdIsValid = (id) => validator.isUUID(id)
