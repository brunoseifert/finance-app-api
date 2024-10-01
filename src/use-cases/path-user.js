import bcrypt from 'bcrypt'

import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email'
import { EmailAlreadyInUseError } from '../error/user'
import { PostgresUpdateRepository } from '../repositories/postgres/path-user'

export class UpdatedUserUserCase {
    async execute(userId, updateUserParams) {
        //verificar email ja existente

        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository()

            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        // verificar senha ja existente

        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }
        //chamar repositorio para atualizar

        const postgresUpdateRepository = new PostgresUpdateRepository()
        const updatedUser = await postgresUpdateRepository.execute(
            userId,
            updateUserParams,
        )

        return updatedUser
    }
}
