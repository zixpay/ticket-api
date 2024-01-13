import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'

interface Input {
  id: string
}

interface Output {
  establishment: Establishment
}

@Injectable()
export class ShowEstablishmentUseCase {
  constructor(private establishmentsRepository: EstablishmentsRepository) {}

  async execute({ id }: Input): Promise<Output> {
    if (!id) {
      throw new BadGatewayException('Id is required')
    }

    const establishment = await this.establishmentsRepository.findByid(id)

    if (!establishment) {
      throw new NotFoundException('Establishment not found')
    }

    return {
      establishment,
    }
  }
}
