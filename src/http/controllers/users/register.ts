import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function register(request: Request, response: Response) {
  const registerUserBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(2).max(2),
    zipcode: z.string().min(1),
  })

  const { name, email, password, phoneNumber, street, city, state, zipcode } =
    registerUserBodySchema.parse(request.body)

  try {
    const registersUseCase = makeRegisterUseCase()

    await registersUseCase.execute({
      name,
      email,
      password,
      phoneNumber,
      street,
      city,
      state,
      zipcode,
    })

    return response.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    throw error
  }
}
