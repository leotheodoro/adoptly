import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetDetailsUseCaseRequest {
  id: string
}

interface PetDetailsUseCaseResponse {
  pet: Pet
}

export class PetDetailsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    id,
  }: PetDetailsUseCaseRequest): Promise<PetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
