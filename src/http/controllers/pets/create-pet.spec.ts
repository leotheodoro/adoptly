import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const name = 'Pet Name'
    const response = await request(app)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name,
        bio: 'Bio Pet',
        type: 'DOG',
        age: 1,
        energyLevel: 1,
        independenceLevel: 1,
        ambientType: 'Indoor',
      })

    expect(response.body.name).toEqual(name)
    expect(response.statusCode).toEqual(201)
  })
})
