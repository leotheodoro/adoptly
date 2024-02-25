import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { Express } from 'express'
import request from 'supertest'

export async function createAndAuthenticateUser(app: Express) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      city: 'City',
      phone_number: '111111111',
      state: 'State',
      street: 'Street',
      zipcode: '111111',
    },
  })

  const authResponse = await request(app).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token }: { token: string } = authResponse.body

  return { token }
}
