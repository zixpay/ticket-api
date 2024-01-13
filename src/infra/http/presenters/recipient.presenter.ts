import { User } from '@/domain/enterprise/entities/user'

export class RecipientPresenter {
  static toHTTP(user: User) {
    return {
      // document: user.recipientDocument,
      // email: user.recipientEmail,
      // name: user.recipientName,
      // phone: user.recipientPhone,
      // birthdate: user.recipientBirthdate,
      recipient_document: user.recipientDocument,
      recipient_email: user.recipientEmail,
      recipient_name: user.recipientName,
      recipient_phone: user.recipientPhone,
      recipient_birthdate: user.recipientBirthdate,
      // zip_code: user.address.zipCode,
      // state: user.address.state,
      // city: user.address.city,
      // neighborhood: user.address.neighborhood,
      // street: user.address.street,
      // number: user.address.number,
      // complement: user.address.complement,
      created_at: user.createdAt,
    }
  }
}
