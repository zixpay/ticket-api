import { User } from '@/domain/enterprise/entities/user'

export abstract class UsersRepository {
  abstract findByDocument(document: string): Promise<User | null>
  abstract create(user: User): Promise<User>
  abstract findByRecipientDocument(
    recipientDocument: string,
  ): Promise<User | null>
}
