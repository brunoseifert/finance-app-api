import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
})

export const PostgresHelper = {
    async query(query, params) {
        const client = await pool.connect()

        const result = await client.query(query, params)

        await client.release()

        return result.rows
    },
}
