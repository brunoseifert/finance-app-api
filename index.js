import 'dotenv/config.js'
import express from 'express'

import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { UpdateUserController } from './src/controllers/patch-user.js'
import { DeleteUserController } from './src/controllers/delete-user.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).json(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).json(body)
})

app.get('/api/users/:userId', async (request, response) => {

    const getUserByIdRepository = new GetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)

    response.status(statusCode).json(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(request)

    response.status(statusCode).json(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
