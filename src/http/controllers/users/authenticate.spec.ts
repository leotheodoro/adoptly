import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  it('should be able to authenticate', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phoneNumber: '11111111',
      street: 'Street',
      city: 'City',
      state: 'SP',
      zipcode: '111111-111'
    })

    const response = await request(app).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
