import { Pet, Prisma } from '@prisma/client'
import { FindPetsByCityParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private readonly usersRepository: UsersRepository) {}

  public pets: Pet[] = []

  async create(
    data: Prisma.PetUncheckedCreateWithoutPetImageInput,
  ): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      bio: data.bio ?? null,
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

  async findByCity({ state, city }: FindPetsByCityParams) {
    const users = await this.usersRepository.findByCity({ state, city })
    const user_ids = users.map((user) => user.id)

    console.log(user_ids)

    const pets = this.pets.filter((pet) => user_ids.includes(pet.user_id))

    console.log(this.pets)
    console.log(pets)

    return pets
  }
}
