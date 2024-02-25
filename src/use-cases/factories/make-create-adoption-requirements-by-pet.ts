import { CreateAdoptionRequirementsByPetUseCase } from '../create-adoption-requirements-by-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreateAdoptionRequirementsByPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const createAdoptionRequirementsByPetUseCase =
    new CreateAdoptionRequirementsByPetUseCase(petsRepository)

  return createAdoptionRequirementsByPetUseCase
}
