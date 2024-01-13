import {
  Establishment as PrismaEstablishment,
  Address as PrismaAddress,
  type Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Address } from '@/domain/enterprise/entities/address'
import { Establishment } from '@/domain/enterprise/entities/establishment'

export class PrismaEstablismentMapper {
  static toDomain(
    rawEstablishment: PrismaEstablishment,
    rawAddress: PrismaAddress,
  ): Establishment {
    return Establishment.create(
      {
        token: rawEstablishment.token,
        establishment: rawEstablishment.establishment,
        name: rawEstablishment.name,
        fantasyName: rawEstablishment.fantasy_name,
        document: rawEstablishment.document,
        sellerId: rawEstablishment.seller_id,
        fineValue: +rawEstablishment.fine_value,
        dailyArrears: +rawEstablishment.daily_arrears,
        pageUrl: rawEstablishment.page_url ?? '',
        email: rawEstablishment.email ?? '',
        logoUrl: rawEstablishment.logo_url ?? '',
        phone: rawEstablishment.phone ?? '',
        address: Address.create({
          userId: new UniqueEntityID(rawEstablishment.id),
          zipCode: rawAddress.zip_code,
          state: rawAddress.state,
          city: rawAddress.city,
          neighborhood: rawAddress.neighborhood,
          street: rawAddress.street,
          number: rawAddress.number,
          complement: rawAddress.complement ?? 'Não informado',
        }),
      },
      new UniqueEntityID(rawEstablishment.id),
    )
  }

  static toPrisma(
    establishment: Establishment,
  ): Prisma.EstablishmentUncheckedCreateInput {
    return {
      id: establishment.id.toString(),
      token: establishment.token,
      establishment: establishment.establishment,
      name: establishment.name,
      fantasy_name: establishment.fantasyName,
      document: establishment.document,
      seller_id: establishment.sellerId,
      fine_value: establishment.fineValue,
      daily_arrears: establishment.dailyArrears,
      page_url: establishment.pageUrl ?? '',
      email: establishment.email ?? null,
      logo_url: establishment.logoUrl ?? null,
      phone: establishment.phone ?? null,
      addresses: {
        create: {
          zip_code: establishment.address.zipCode,
          state: establishment.address.state,
          city: establishment.address.city,
          neighborhood: establishment.address.neighborhood,
          street: establishment.address.street,
          number: establishment.address.number,
          complement: establishment.address.complement,
        },
      },
    }
  }
}
