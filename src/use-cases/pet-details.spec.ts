import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetDetailsUseCase } from './pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: PetDetailsUseCase

describe('Pet Details Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository(usersRepository)
    sut = new PetDetailsUseCase(petsRepository)
  })

  it('should return a pet', async () => {
    const user1 = await usersRepository.create({
      name: 'User 1',
      email: 'user1@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      street: 'Street',
      zipcode: '1111111',
      phone_number: '1111111',
    })

    const pet1 = await petsRepository.create({
      name: 'Pet 1',
      bio: 'bio',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'DOG',
      user_id: user1.id,
    })

    const { pet } = await sut.execute({
      id: pet1.id,
    })

    expect(pet).toEqual(pet1)
  })

  it('should throw an exception if pet not found', async () => {
    const user1 = await usersRepository.create({
      name: 'User 1',
      email: 'user1@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      street: 'Street',
      zipcode: '1111111',
      phone_number: '1111111',
    })

    await petsRepository.create({
      name: 'Pet 1',
      bio: 'bio',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'DOG',
      user_id: user1.id,
    })

    await expect(
      async () =>
        await sut.execute({
          id: 'non-existent-id',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
