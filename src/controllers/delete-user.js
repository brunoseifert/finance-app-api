import { DeleteUserUseCase } from '../use-cases/delete-user'
import { ok, serverError } from './helpers/http'
import { checkIdIsValid, invalidIdResponse } from './helpers/user'

export const DeleteUserController = {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id

            const idIsValid = checkIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    },
}
