import { type PetsRepository } from '@/repositories/pets-repository'

interface CreateAdoptionRequirementsByPetUseCaseRequest {
  petId: string
  requirements: string[]
}

export class CreateAdoptionRequirementsByPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    petId,
    requirements,
  }: CreateAdoptionRequirementsByPetUseCaseRequest): Promise<void> {
    await this.petsRepository.createAdoptionRequirements({
      petId,
      requirements,
    })
  }
}
