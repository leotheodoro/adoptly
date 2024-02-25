import { makePetDetailsUseCase } from '@/use-cases/factories/make-pet-details-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function petDetails(request: Request, response: Response) {
  const petDetailsParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = petDetailsParamsSchema.parse(request.params)

  const fetchPetsByCityUseCase = makePetDetailsUseCase()

  const { pet } = await fetchPetsByCityUseCase.execute({
    id,
  })

  return response.status(200).json(pet)
}
