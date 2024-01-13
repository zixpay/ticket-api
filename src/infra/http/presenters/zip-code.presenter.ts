import { ZipCodeSearchOutput } from '@/domain/application/use-cases/show-address-by-zipcode.use-case'

export class ZipCodePresenter {
  static toHTTP(address: ZipCodeSearchOutput) {
    return {
      zip_code: address.zipCode,
      state: address.state,
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
    }
  }
}
