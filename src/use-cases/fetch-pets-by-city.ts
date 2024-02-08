import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetType } from '@prisma/client'

interface FetchPetsByCityUseCaseRequest {
  state: string
  city: string
  type?: PetType
  energyLevel?: number
  independenceLevel?: number
  ambientType?: string
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    state,
    city,
    type,
    energyLevel,
    independenceLevel,
    ambientType,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity({
      state,
      city,
      type,
      energyLevel,
      independenceLevel,
      ambientType,
    })

    return { pets }
  }
}
