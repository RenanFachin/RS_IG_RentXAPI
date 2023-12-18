import request from 'supertest'
import { app } from '../../../../app'

describe('Create category controller', () => {
  it('should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category SuperTest',
      description: 'Category SuperTest description',
    })

    expect(response.status).toBe(201)
  })
})
