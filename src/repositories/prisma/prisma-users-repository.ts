import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { FindUsersByCityParams, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByCity({ city, state }: FindUsersByCityParams) {
    const users = await prisma.user.findMany({
      where: {
        city,
        state,
      },
    })

    return users
  }
}
