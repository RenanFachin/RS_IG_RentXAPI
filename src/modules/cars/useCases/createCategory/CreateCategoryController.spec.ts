import request from 'supertest'
import { app } from '../../../../app'
import { Connection, createConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

let connection: Connection

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection()

    // rodando as migrations
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('adminadmin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `,
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()

    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'adminadmin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category SuperTest',
        description: 'Category SuperTest description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })
})
