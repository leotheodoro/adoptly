import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Pet Details (e2e)', () => {
  it('should be able to fetch pet details', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const name = 'Pet Name'
    const petCreatedResponse = await request(app)
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

    const petId = petCreatedResponse.body.id

    const response = await request(app).get(`/pets/${petId}`)

    expect(response.body.id).toEqual(petId)
    expect(response.body.name).toEqual(name)
    expect(response.statusCode).toEqual(200)
  })
})
