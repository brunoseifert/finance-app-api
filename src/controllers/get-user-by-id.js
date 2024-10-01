import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, ok, serverError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        const isIdValid = validator.isUUID(httpRequest.params.userId)

        if (!isIdValid) {
            return badRequest({
                errorMessage: 'Invalid user id',
            })
        }

        try {
            // Chamar use case
            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            // Retornar resposta
            return ok(user)
        } catch (error) {
            console.error('GetUserByIdController', error)
            return serverError()
        }
    }
}
