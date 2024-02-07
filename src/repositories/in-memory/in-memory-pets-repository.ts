import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../ pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(
    data: Prisma.PetUncheckedCreateWithoutPetImageInput,
  ): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      bio: data.bio,
      type: data.type,
      age: data.age,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      ambient_type: data.ambient_type,
      user_id: data.user_id,
      adopted_at: null,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
