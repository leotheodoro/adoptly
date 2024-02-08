import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

export async function authenticate(request: Request, response: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
    })

    const refreshToken = jwt.sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '7d',
    })

    response.cookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
    })

    return response.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(400).send({ message: error.message })
    }

    throw error
  }
}
