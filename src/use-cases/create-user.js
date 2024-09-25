import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email ja esta cadastrado

        //gerar id

        const userid = uuidv4()

        //criptografar senha

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //criar usuario

        const user = {
            ...createUserParams,
            ID: userid,
            password: hashedPassword,
        }

        //chamar repositorio para salvar usuario

        const postgrescreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = await postgrescreateUserRepository.execute(user)

        return createdUser
    }
}
