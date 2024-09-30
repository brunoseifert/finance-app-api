export class GetUserByIdUseCase {
    async execute(userId) {
        // Chamar repositório
        const PostgresGetUserByIdRepository =
            new PostgresGetUserByIdRepository()

        const user = await PostgresGetUserByIdRepository.execute(userId)

        // Retornar usuário
        return user
    }
}
