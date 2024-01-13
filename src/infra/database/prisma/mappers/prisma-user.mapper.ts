import {
  User as PrismaUser,
  Address as PrismaAddress,
  type Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { User } from '@/domain/enterprise/entities/user'
import { Address } from '@/domain/enterprise/entities/address'

export class PrismaUserMapper {
  static toDomain(rawUser: PrismaUser, rawAddress: PrismaAddress): User {
    return User.create(
      {
        document: rawUser.document,
        name: rawUser.name,
        email: rawUser.email,
        phone: rawUser.phone,
        birthdate: rawUser.birthdate,
        recipientDocument: rawUser.recipient_document ?? '',
        recipientName: rawUser.recipient_name ?? '',
        recipientEmail: rawUser.recipient_email ?? '',
        recipientPhone: rawUser.recipient_phone ?? '',
        recipientBirthdate: rawUser.recipient_birthdate ?? '',
        address: Address.create({
          userId: new UniqueEntityID(rawUser.id),
          zipCode: rawAddress.zip_code,
          state: rawAddress.state,
          city: rawAddress.city,
          neighborhood: rawAddress.neighborhood,
          street: rawAddress.street,
          number: rawAddress.number,
          complement: rawAddress.complement ?? 'Não informado',
        }),
      },
      new UniqueEntityID(rawUser.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      document: user.document ?? '',
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
      birthdate: user.birthdate ?? '',
      recipient_document: user.recipientDocument,
      recipient_name: user.recipientName,
      recipient_email: user.recipientEmail,
      recipient_phone: user.recipientPhone,
      recipient_birthdate: user.recipientBirthdate,
      addresses: {
        create: {
          zip_code: user.address.zipCode,
          state: user.address.state,
          city: user.address.city,
          neighborhood: user.address.neighborhood,
          street: user.address.street,
          number: user.address.number,
          complement: user.address.complement,
        },
      },
    }
  }
}
