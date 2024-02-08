import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository(usersRepository)
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should list pets by city', async () => {
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

    const user2 = await usersRepository.create({
      name: 'User 2',
      email: 'user2@example.com',
      password: '123456',
      city: 'Guarulhos',
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

    await petsRepository.create({
      name: 'Pet 2',
      bio: 'bio',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'DOG',
      user_id: user2.id,
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(pet1)
  })

  it('should return empty array if no pets available', async () => {
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

    const user2 = await usersRepository.create({
      name: 'User 2',
      email: 'user1@example.com',
      password: '123456',
      city: 'Guarulhos',
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

    await petsRepository.create({
      name: 'Pet 2',
      bio: 'bio',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'DOG',
      user_id: user2.id,
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'Osasco',
    })

    expect(pets).toHaveLength(0)
  })

  it('should list pets by city and one filter', async () => {
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

    const user2 = await usersRepository.create({
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

    await petsRepository.create({
      name: 'Pet 2',
      bio: 'bio',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'CAT',
      user_id: user2.id,
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'São Paulo',
      type: 'DOG',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].type).toEqual('DOG')
  })

  it('should list pets by city and two or more filters', async () => {
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

    const user2 = await usersRepository.create({
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

    await petsRepository.create({
      name: 'Pet 2',
      bio: 'bio',
      age: 1,
      energy_level: 2,
      independence_level: 1,
      ambient_type: 'Fechado',
      type: 'CAT',
      user_id: user2.id,
    })

    await petsRepository.create({
      name: 'Pet 2',
      bio: 'bio',
      age: 1,
      energy_level: 2,
      independence_level: 3,
      ambient_type: 'Fechado',
      type: 'CAT',
      user_id: user2.id,
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'São Paulo',
      type: 'CAT',
      energyLevel: 2,
      independenceLevel: 3,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].type).toEqual('CAT')
    expect(pets[0].energy_level).toEqual(2)
    expect(pets[0].independence_level).toEqual(3)
  })
})
