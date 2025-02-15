export class GetUserByIdUseCase {

    constructor(getUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(userId) {
        // Chamar repositório
        const user = await this.getUserByIdRepository.execute(userId)

        // Retornar usuário
        return user
    }
}
