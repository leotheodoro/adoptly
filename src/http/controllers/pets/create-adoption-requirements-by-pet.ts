import { makeCreateAdoptionRequirementsByPetUseCase } from '@/use-cases/factories/make-create-adoption-requirements-by-pet'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createAdoptionRequirementsByPet(
  request: Request,
  response: Response,
) {
  const createPetBodySchema = z.object({
    requirements: z.array(z.string()),
  })
  const createPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id: petId } = createPetParamsSchema.parse(request.params)
  const { requirements } = createPetBodySchema.parse(request.body)

  const createAdoptionRequirementsByPetUseCase =
    makeCreateAdoptionRequirementsByPetUseCase()

  await createAdoptionRequirementsByPetUseCase.execute({
    petId,
    requirements,
  })

  return response.status(201).send()
}
