import { User } from '@/domain/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      document: user.document,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthdate: user.birthdate,
      // recipient_document: user.recipientDocument,
      // recipient_email: user.recipientEmail,
      // recipient_name: user.recipientName,
      // recipient_phone: user.recipientPhone,
      // recipient_birthdate: user.recipientBirthdate,
      zip_code: user.address.zipCode,
      state: user.address.state,
      city: user.address.city,
      neighborhood: user.address.neighborhood,
      street: user.address.street,
      number: user.address.number,
      complement: user.address.complement,
      created_at: user.createdAt,
    }
  }
}
