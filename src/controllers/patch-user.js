import validator from 'validator'
import { ok, serverError, badRequest } from './helpers/http.js'
import { UpdatedUserUserCase } from '../use-cases/patch-user.js'
import { EmailAlreadyInUseError } from '../error/user.js'
import { checkPassowrdIsValid } from './helpers/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isValidId = validator.isUUID(userId)

            if (!isValidId) {
                return badRequest({
                    message: 'Invalid id',
                })
            }

            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsInvalid = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsInvalid) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const passwordValidation = checkPassowrdIsValid(params.password)

                if (!passwordValidation) {
                    return badRequest({
                        message: 'Invalid password',
                    })
                }
            }

            if (params.email) {
                const emailValidation = validator.isEmail(params.email)

                if (!emailValidation) {
                    return badRequest({
                        message: 'Invalid email',
                    })
                }
            }

            const updatedUseCase = new UpdatedUserUserCase()

            const updatedUser = await updatedUseCase.execute(userId, params)

            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }

            console.error(error)
            return serverError()
        }
    }
}
