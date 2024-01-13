import { Injectable } from '@nestjs/common'
import { HttpService as AxiosHttpModule } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

interface Input {
  address: string
}

interface Output {
  zipCode: string
}

export interface SearchResponse {
  zipCode: string
}

@Injectable()
export class ShowZipCodeByAddressUseCase {
  constructor(private readonly httpService: AxiosHttpModule) {}

  async execute({ address }: Input): Promise<Output> {
    const addressUrl = 'https://viacep.com.br/ws/' + address + '/json/'

    const { data } = await firstValueFrom(
      this.httpService.get<SearchResponse>(addressUrl),
    )

    const zipCode = data[0].cep

    return {
      zipCode,
    }
  }
}
