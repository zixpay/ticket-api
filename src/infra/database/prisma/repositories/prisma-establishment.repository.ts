import { ConflictException, Injectable } from '@nestjs/common'

import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { PrismaEstablismentMapper } from '@/infra/database/prisma/mappers/prisma-establishment.mapper'

@Injectable()
export class PrismaEstablishmentsRepository
  implements EstablishmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByid(id: string) {
    const establishment = await this.prisma.establishment.findFirst({
      where: {
        page_url: id,
      },
    })

    if (!establishment) {
      return null
    }

    const address = await this.prisma.address.findFirst({
      where: {
        establishment_id: establishment.id,
      },
    })

    if (!address) {
      return null
    }

    return PrismaEstablismentMapper.toDomain(establishment, address)
  }

  async findByToken(token: string) {
    const establishment = await this.prisma.establishment.findFirst({
      where: { token },
    })

    if (!establishment) {
      return null
    }

    return establishment.page_url
  }

  async findByPageUrl(pageUrl: string) {
    const result = await this.prisma.establishment.findFirst({
      where: {
        page_url: pageUrl,
      },
    })

    if (!result) {
      return null
    }

    return {
      fineValue: +result.fine_value,
      dailyArrears: +result.daily_arrears,
      token: result.token,
    }
  }

  async create(establishment: Establishment): Promise<Establishment> {
    const data = PrismaEstablismentMapper.toPrisma(establishment)

    const createdEstablishment = await this.prisma.establishment.create({
      data,
    })

    const address = await this.prisma.address.findFirst({
      where: {
        establishment_id: createdEstablishment.id,
      },
    })

    if (!address) {
      throw new ConflictException('Address not found')
    }

    return PrismaEstablismentMapper.toDomain(createdEstablishment, address)
  }
}
