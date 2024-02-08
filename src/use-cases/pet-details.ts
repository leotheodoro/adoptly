import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

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

    return { pet }
  }
}
