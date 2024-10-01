import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresUpdateRepository {
    async execute(
        userId,
        updateUserParams = {
            first_name: 'Bruno',
            last_name: 'Seifert',
        },
    ) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateUserParams[key])
        })

        updateValues.push(userId)

        const updateQuery = `
    UPDATE users 
    SET ${updateFields.join(', ')} 
    WHERE id = $${updateValues.length} 
    RETURNING *`

        const updatedUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updatedUser[0]
    }
}
