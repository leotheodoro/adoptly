import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { PetType } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

const PetTypeEnum = z.enum([PetType.CAT, PetType.DOG])

export async function fetchPetsByCity(request: Request, response: Response) {
  const createPetBodySchema = z.object({
    state: z.string(),
    city: z.string(),
    type: PetTypeEnum.optional(),
    age: z.number().optional(),
    energyLevel: z.number().optional(),
    independenceLevel: z.number().optional(),
    ambientType: z.string().optional(),
  })

  const { state, city, type, energyLevel, independenceLevel, ambientType } =
    createPetBodySchema.parse(request.body)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    state,
    city,
    type,
    energyLevel,
    independenceLevel,
    ambientType,
  })

  return response.status(200).json(pets)
}
