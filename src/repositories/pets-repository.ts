import { PetType, type Pet, type Prisma } from '@prisma/client'

export interface FindPetsByCityParams {
  state: string
  city: string
  type?: PetType
  energyLevel?: number
  independenceLevel?: number
  ambientType?: string
}

export interface CreateAdoptionRequirementsParams {
  petId: string
  requirements: string[]
}

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateWithoutPetImageInput) => Promise<Pet>
  createAdoptionRequirements: (
    data: CreateAdoptionRequirementsParams,
  ) => Promise<void>
  findByCity: (data: FindPetsByCityParams) => Promise<Pet[]>
  findById: (id: string) => Promise<Pet | null>
}
