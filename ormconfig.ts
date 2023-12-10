import dotenv from 'dotenv'

dotenv.config()

export = {
  type: 'postgres',
  port: process.env.POSTGRES_PORT,
  host: 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}
