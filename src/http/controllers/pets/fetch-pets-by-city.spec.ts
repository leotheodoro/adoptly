import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Pet (e2e)', () => {
  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const name = 'Pet Name'
    await request(app)
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

    await request(app)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 2',
        bio: 'Bio Pet',
        type: 'DOG',
        age: 1,
        energyLevel: 1,
        independenceLevel: 1,
        ambientType: 'Indoor',
      })

    const response = await request(app).get('/pets').send({
      state: 'State',
      city: 'City',
    })

    expect(response.body.length).toEqual(2)
    expect(response.statusCode).toEqual(200)
  })
})
