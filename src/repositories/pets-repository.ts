import { type Pet, type Prisma } from '@prisma/client'

export interface PetsRepository {
  create: (data: Prisma.PetUncheckedCreateWithoutPetImageInput) => Promise<Pet>
}
