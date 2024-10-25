import { CreateUserUseCase } from '../use-cases/create-user.js'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../error/user.js'
import {
    checkEmailIsValid,
    checkPassowrdIsValid,
    EmailAlreadyInUseResponse,
    InvalidPassawordResponse,
} from './helpers/user.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Validar parâmetros
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        errorMessage: `${field} is required`,
                    })
                }
            }

            // Validar senha
            const passwordValidation = checkPassowrdIsValid(params.password)

            if (!passwordValidation) {
                return InvalidPassawordResponse()
            }

            // Validar email
            const emailValidation = checkEmailIsValid(params.email)

            if (!emailValidation) {
                return EmailAlreadyInUseResponse()
            }

            // Chamar use case
            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            // Retornar resposta
            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
