import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateAdoptionRequirementsByPetUseCase } from './create-adoption-requirements-by-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let petsRepository: InMemoryPetsRepository
let sut: CreateAdoptionRequirementsByPetUseCase

describe('Create Adoption Requirements Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    petsRepository = new InMemoryPetsRepository(usersRepository)
    sut = new CreateAdoptionRequirementsByPetUseCase(petsRepository)
  })

  it('should insert a list of adoption requirements', async () => {
    const pet = await petsRepository.create({
      name: 'Pet 1',
      bio: 'oi',
      age: 1,
      energy_level: 1,
      independence_level: 1,
      ambient_type: 'fechado',
      user_id: '1',
      type: 'DOG',
    })

    const requirements = ['first requirement', 'second requirement']

    await sut.execute({
      petId: pet.id,
      requirements,
    })

    expect(petsRepository.adoptionRequirements).toHaveLength(2)
    expect(petsRepository.adoptionRequirements[0].text).toEqual(
      'first requirement',
    )
    expect(petsRepository.adoptionRequirements[1].text).toEqual(
      'second requirement',
    )
  })

  it('should throw an exception if pet doesnt exist', async () => {
    await expect(
      async () =>
        await sut.execute({
          petId: 'non-existent-id',
          requirements: [],
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
