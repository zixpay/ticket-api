import { Establishment } from '@/domain/enterprise/entities/establishment'

export class EstablishmentPresenter {
  static toHTTP(establishment: Establishment) {
    return {
      id: establishment.id.toValue(),
      page_url: establishment.pageUrl,
      name: establishment.name,
      fantasy_name: establishment.fantasyName,
      document: establishment.document,
      email: establishment.email,
      logo_url: establishment.logoUrl,
      seller_id: establishment.sellerId,
      phone: establishment.phone,
      fine_value: establishment.fineValue,
      daily_arrears: establishment.dailyArrears,
      token: establishment.token,
      establishment: establishment.establishment,
      street: establishment.address.street,
      number: establishment.address.number,
      neighborhood: establishment.address.neighborhood,
      city: establishment.address.city,
      state: establishment.address.state,
      zip_code: establishment.address.zipCode,
      complement: establishment.address.complement ?? 'Não informado.',
    }
  }
}
