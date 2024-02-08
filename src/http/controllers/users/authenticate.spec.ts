import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { env } from '@/env'
import { Server } from 'http'

let server: Server

describe('Authenticate (e2e)', () => {
  beforeAll(() => {
    server = app.listen(env.PORT)
  })

  afterAll(() => {
    server.close()
  })

  it('should be able to authenticate', async () => {
    await request(server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phoneNumber: '11111111',
      street: 'Street',
      city: 'City',
      state: 'SP',
      zipcode: '111111-111'
    })

    const response = await request(server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
