import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number,
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
