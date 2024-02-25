import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Adoption Requirements By Pet (e2e)', () => {
  it('should be able to insert a list of requirements by pet', async () => {
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
    const requirements = ['first requirement', 'second requirement']

    const response = await request(app)
      .post(`/pets/${petId}/requirements`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        requirements,
      })

    expect(response.statusCode).toEqual(201)
  })
})
