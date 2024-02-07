import { type Prisma, type User } from '@prisma/client'

export interface FindUsersByCityParams {
  state: string
  city: string
}

export interface UsersRepository {
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByCity: (data: FindUsersByCityParams) => Promise<User[]>
  create: (data: Prisma.UserCreateInput) => Promise<User>
}
