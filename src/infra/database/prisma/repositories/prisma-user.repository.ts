import { ConflictException, Injectable } from '@nestjs/common'

import { User } from '@/domain/enterprise/entities/user'
import { UsersRepository } from '@/domain/application/repositories/users.repository'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user.mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByDocument(document: string) {
    const user = await this.prisma.user.findFirst({
      where: { document },
    })

    if (!user) {
      return null
    }

    const address = await this.prisma.address.findFirst({
      where: {
        user_id: user.id,
      },
    })

    if (!address) {
      return null
    }

    return PrismaUserMapper.toDomain(user, address)
  }

  async findByRecipientDocument(
    recipientDocument: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        recipient_document: recipientDocument,
      },
    })

    if (!user) {
      return null
    }

    const address = await this.prisma.address.findFirst({
      where: {
        user_id: user.id,
      },
    })

    if (!address) {
      return null
    }

    return PrismaUserMapper.toDomain(user, address)
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)

    const createdUser = await this.prisma.user.create({ data })

    const address = await this.prisma.address.findFirst({
      where: {
        user_id: createdUser.id,
      },
    })

    if (!address) {
      throw new ConflictException('Address not found')
    }

    return PrismaUserMapper.toDomain(createdUser, address)
  }
}

// async findManyByQuestionId(
//   accountId: string,
//   params: PaginationParams,
// ): Promise<Answer[]> {
//   const accounts = await this.prisma.user.findMany({
//     where: {
//       id: accountId,
//     },
//     orderBy: {
//       created_at: 'desc',
//     },
//     take: 20,
//     skip: (params.page - 1) * 20,
//   })

//   return accounts.map(PrismaAccountMapper.toDomain)
// }

// async save(answer: Answer): Promise<void> {
//   const data = PrismaAccountMapper.toPrisma(answer)

//   await this.prisma.user.update({
//     where: {
//       id: data.id,
//     },
//     data,
//   })
// }

// async delete(answer: Answer): Promise<void> {
//   const data = PrismaAccountMapper.toPrisma(answer)

//   await this.prisma.user.delete({
//     where: {
//       id: data.id,
//     },
//   })
// }
// }
