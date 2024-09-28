import validator from 'validator'
import { CreateUserUseCase } from '../use-cases/create-user.js'

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
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param: ${field}`,
                        },
                    }
                }
            }

            // Validar senha
            const passwordValidation =
                params.password.length < 6 ||
                params.password.length > 20 ||
                !/[!@#$%^&*()\-_+={}[\]|\\?<>.,;:]/.test(params.password)

            if (passwordValidation) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage:
                            'Password must be between 6 and 20 characters and contain at least one special character',
                    },
                }
            }

            // Validar email
            const emailValidation = validator.isEmail(params.email)

            if (!emailValidation) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: 'Invalid email',
                    },
                }
            }

            // Chamar use case
            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            // Retornar resposta
            return {
                statusCode: 201,
                body: createdUser,
            }
        } catch (error) {
            console.error('CreateUserController', error)
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'Server error',
                    details: error.message,
                },
            }
        }
    }
}
