import { type PetsRepository } from '@/repositories/pets-repository'
import { PetType, type Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  bio?: string
  type: PetType
  age: number
  energyLevel: number
  independenceLevel: number
  ambientType: string
  userId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    bio,
    type,
    age,
    energyLevel,
    independenceLevel,
    ambientType,
    userId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      bio,
      type,
      age,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      ambient_type: ambientType,
      user_id: userId,
    })

    return { pet }
  }
}
