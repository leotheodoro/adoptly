import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua street',
      zipcode: '11111-111',
      phoneNumber: '(11) 99999-9999',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua street',
      zipcode: '11111-111',
      phoneNumber: '(11) 99999-9999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      email,
      name: 'John Doe',
      password: '123456',
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua street',
      zipcode: '11111-111',
      phoneNumber: '(11) 99999-9999',
    })

    await expect(
      async () =>
        await sut.execute({
          email,
          name: 'John Doe',
          password: '123456',
          city: 'São Paulo',
          state: 'SP',
          street: 'Rua street',
          zipcode: '11111-111',
          phoneNumber: '(11) 99999-9999',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
