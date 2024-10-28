import { PostgresDeleteUser } from '../repositories/postgres/delete.user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const deleteUserRepository = new PostgresDeleteUser()

        const deletedUser = await deleteUserRepository.execute(userId)

        return deletedUser
    }
}
