import { type Pet, type Prisma } from '@prisma/client'

export interface FindPetsByCityParams {
  state: string
  city: string
}

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateWithoutPetImageInput) => Promise<Pet>
  findByCity: (data: FindPetsByCityParams) => Promise<Pet[]>
}
