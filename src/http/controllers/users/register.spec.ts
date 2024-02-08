import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { Server } from 'http'
import { env } from '@/env'

let server: Server

describe('Register (e2e)', () => {
  beforeAll(() => {
    server = app.listen(env.TEST_E2E_PORT)
  })

  afterAll(() => {
    server.close()
  })

  it('should be able to register', async () => {
    const response = await request(server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phoneNumber: '11111111',
      street: 'Street',
      city: 'City',
      state: 'SP',
      zipcode: '111111-111'
    })

    expect(response.statusCode).toEqual(201)
  })
})
