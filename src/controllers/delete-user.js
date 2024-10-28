import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import { notFound, ok, serverError } from './helpers/http.js'
import { checkIdIsValid, invalidIdResponse } from './helpers/user.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return notFound({
                    message: 'User not found.',
                })
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
