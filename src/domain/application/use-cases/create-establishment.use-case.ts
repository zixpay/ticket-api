import { Injectable } from '@nestjs/common'
import { HttpService as AxiosHttpModule } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

import { SearchResponse } from '@/core/interfaces/establishment'
import { Contact, classifyContacts } from '@/core/helpers/classify-contacts'

import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'
import { Address } from '@/domain/enterprise/entities/address'
import { Establishment } from '@/domain/enterprise/entities/establishment'

interface Input {
  token: string
  establishment: string
  dailyArrears: number
  fineValue: number
}

export interface Output {
  pageUrl: string
}

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    private readonly httpService: AxiosHttpModule,
    private readonly establishmentRepository: EstablishmentsRepository,
  ) {}

  async execute({
    fineValue,
    dailyArrears,
    establishment,
    token,
  }: Input): Promise<Output> {
    const urlToFetchInfo =
      'https://api.zsystems.com.br/estabelecimentos/' + establishment

    const { data } = await firstValueFrom(
      this.httpService.get<{ estabelecimento: SearchResponse }>(
        urlToFetchInfo,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer b2db5b3911520e19b5a1583758d45488ee7bfe7b`,
          },
        },
      ),
    )

    const url = await this.establishmentRepository.findByToken(token)
    if (url) {
      return {
        pageUrl: 'link.zixpay.com.br/' + url,
      }
    }

    const contacts = data?.estabelecimento?.estabelecimentos_contatos

    const { email, phone } = classifyContacts(contacts as Contact[])

    const address = Address.create({
      zipCode: data?.estabelecimento?.endereco?.cep,
      state: data?.estabelecimento?.endereco?.uf,
      city: data?.estabelecimento?.endereco?.cidade,
      neighborhood: data?.estabelecimento?.endereco?.bairro,
      street: data?.estabelecimento?.endereco?.logradouro,
      number: data?.estabelecimento?.endereco?.numero,
      complement:
        data?.estabelecimento?.endereco?.complemento !== undefined &&
        data?.estabelecimento?.endereco?.complemento.length > 0
          ? data?.estabelecimento?.endereco?.complemento
          : 'Não informado',
    })

    const createdEstablishment = Establishment.create({
      establishment,
      token,
      name: data?.estabelecimento?.razao_social,
      fantasyName: data?.estabelecimento?.nome_fantasia,
      sellerId: data?.estabelecimento?.zoop_seller_id,
      logoUrl: data?.estabelecimento?.arquivo?.url,
      document:
        data?.estabelecimento?.estabelecimentos_documentos[0]?.documento,
      email,
      phone,
      fineValue,
      dailyArrears,
      address,
    })

    createdEstablishment.address.establishmentId =
      createdEstablishment.id.toString()

    const { pageUrl } =
      await this.establishmentRepository.create(createdEstablishment)

    return {
      pageUrl: 'link.zixpay.com.br/' + pageUrl,
    }
  }
}
