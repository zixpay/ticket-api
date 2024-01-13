import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/application/repositories/users.repository'
import { User } from '@/domain/enterprise/entities/user'
import { Address } from '@/domain/enterprise/entities/address'

interface Input {
  document: string
  email: string
  name: string
  phone: string
  birthdate: string
  recipientDocument?: string
  recipientEmail?: string
  recipientName?: string
  recipientPhone?: string
  recipientBirthdate?: string
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string | null
}

interface Output {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    document,
    email,
    name,
    phone,
    birthdate,
    recipientDocument,
    recipientEmail,
    recipientName,
    recipientPhone,
    recipientBirthdate,
    zipCode,
    state,
    city,
    neighborhood,
    street,
    number,
    complement,
  }: Input): Promise<Output> {
    const userAlreadyExists =
      await this.usersRepository.findByDocument(document)

    if (userAlreadyExists) {
      return {
        user: userAlreadyExists,
      }
    }

    const address = Address.create({
      zipCode,
      state,
      city,
      neighborhood,
      street,
      number,
      complement: complement ?? 'Não informado',
    })

    const createdUser = User.create({
      document,
      email,
      name,
      phone,
      birthdate,
      recipientDocument: recipientDocument ?? '',
      recipientEmail: recipientEmail ?? '',
      recipientName: recipientName ?? '',
      recipientPhone: recipientPhone ?? '',
      recipientBirthdate: recipientBirthdate ?? '',
      address,
    })

    createdUser.address.userId = createdUser.id

    const user = await this.usersRepository.create(createdUser)

    return {
      user,
    }
  }
}
