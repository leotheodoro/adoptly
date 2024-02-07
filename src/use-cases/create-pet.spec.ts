import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository(usersRepository)
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should create a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet 1',
      bio: 'oi',
      age: 1,
      energyLevel: 1,
      independenceLevel: 1,
      ambientType: 'fechado',
      userId: '1',
      type: 'DOG',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopted_at).toEqual(null)
  })

  it('should create a new pet without a bio', async () => {
    const { pet } = await sut.execute({
      name: 'Pet 1',
      age: 1,
      energyLevel: 1,
      independenceLevel: 1,
      ambientType: 'fechado',
      userId: '1',
      type: 'DOG',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopted_at).toEqual(null)
  })
})
