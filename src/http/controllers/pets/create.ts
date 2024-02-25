import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { PetType } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

const PetTypeEnum = z.enum([PetType.CAT, PetType.DOG])

export async function create(request: Request, response: Response) {
  const createPetBodySchema = z.object({
    name: z.string().min(1),
    bio: z.string(),
    type: PetTypeEnum,
    age: z.number(),
    energyLevel: z.number(),
    independenceLevel: z.number(),
    ambientType: z.string(),
    userId: z.string(),
  })

  const {
    name,
    bio,
    type,
    age,
    energyLevel,
    independenceLevel,
    ambientType,
    userId,
  } = createPetBodySchema.parse(request.body)

  try {
    const registersUseCase = makeCreatePetUseCase()

    await registersUseCase.execute({
      name,
      bio,
      type,
      age,
      energyLevel,
      independenceLevel,
      ambientType,
      userId,
    })

    return response.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    throw error
  }
}
