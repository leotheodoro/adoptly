import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { PetType } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

const PetTypeEnum = z.enum([PetType.CAT, PetType.DOG])

export async function createPet(request: Request, response: Response) {
  const createPetBodySchema = z.object({
    name: z.string().min(1),
    bio: z.string(),
    type: PetTypeEnum,
    age: z.number(),
    energyLevel: z.number(),
    independenceLevel: z.number(),
    ambientType: z.string(),
  })

  const { name, bio, type, age, energyLevel, independenceLevel, ambientType } =
    createPetBodySchema.parse(request.body)

  const registersUseCase = makeCreatePetUseCase()

  const { pet } = await registersUseCase.execute({
    name,
    bio,
    type,
    age,
    energyLevel,
    independenceLevel,
    ambientType,
    userId: request.userId,
  })

  return response.status(201).json(pet)
}
