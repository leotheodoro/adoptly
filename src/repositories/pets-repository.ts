import { PetType, type Pet, type Prisma } from '@prisma/client'

export interface FindPetsByCityParams {
  state: string
  city: string
  type?: PetType
  energyLevel?: number
  independenceLevel?: number
  ambientType?: string
}

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateWithoutPetImageInput) => Promise<Pet>
  findByCity: (data: FindPetsByCityParams) => Promise<Pet[]>
  findById: (id: string) => Promise<Pet | null>
}
