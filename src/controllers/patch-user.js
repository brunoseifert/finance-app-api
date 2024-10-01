import validator from 'validator'
import { ok, serverError, badRequest } from './helpers.js'
import { UpdatedUserUserCase } from '../use-cases/patch-user.js'
import { EmailAlreadyInUseError } from '../error/user.js'

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

            const updateUserParams = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsInvalid = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsInvalid) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (updateUserParams.password) {
                const passwordValidation =
                    updateUserParams.password.length < 6 ||
                    updateUserParams.password.length > 20 ||
                    !/[!@#$%^&*()\-_+={}[\]|\\?<>.,;:]/.test(
                        updateUserParams.password,
                    )

                if (passwordValidation) {
                    return badRequest({
                        message:
                            'Password must be between 6 and 20 characters and contain at least one special character',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailValidation = validator.isEmail(
                    updateUserParams.email,
                )

                if (!emailValidation) {
                    return badRequest({
                        message: 'Invalid email',
                    })
                }
            }

            const updatedUseCase = new UpdatedUserUserCase()

            const updatedUser = await updatedUseCase.execute(
                userId,
                updateUserParams,
            )

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
