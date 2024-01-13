import { Injectable } from '@nestjs/common'
import { HttpService as AxiosHttpModule } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

interface Input {
  zipCode: string
}

export interface ZipCodeSearchOutput {
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export interface SearchResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

@Injectable()
export class ShowAddressByZipCodeUseCase {
  constructor(private readonly httpService: AxiosHttpModule) {}

  async execute({ zipCode }: Input): Promise<ZipCodeSearchOutput> {
    const zipCodeUrl = 'https://viacep.com.br/ws/' + zipCode + '/json/'

    const {
      data: { cep, uf, localidade, bairro, logradouro },
    } = await firstValueFrom(this.httpService.get<SearchResponse>(zipCodeUrl))

    return {
      zipCode: cep,
      state: uf,
      city: localidade,
      neighborhood: bairro,
      street: logradouro,
    }
  }
}
