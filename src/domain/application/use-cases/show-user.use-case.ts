import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@/domain/enterprise/entities/user'
import { UsersRepository } from '@/domain/application/repositories/users.repository'

interface Input {
  document?: string
  recipientDocument?: string
}

interface Output {
  user?: User | null
  recipient?: User | null
}

@Injectable()
export class ShowUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ document, recipientDocument }: Input): Promise<Output> {
    let user: User | null = {} as User
    let recipient: User | null = {} as User

    if (document) {
      user = await this.usersRepository.findByDocument(document)
    }

    if (recipientDocument) {
      recipient =
        await this.usersRepository.findByRecipientDocument(recipientDocument)
    }

    if (!user && !recipient) {
      throw new NotFoundException('User not found')
    }

    return {
      user,
      recipient,
    }
  }
}
