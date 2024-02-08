import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phoneNumber: string
  street: string
  city: string
  state: string
  zipcode: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phoneNumber,
    street,
    city,
    state,
    zipcode,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      phone_number: phoneNumber,
      street,
      city,
      state,
      zipcode,
    })

    return { user }
  }
}
