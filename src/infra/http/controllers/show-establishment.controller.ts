import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ShowEstablishmentUseCase } from '@/domain/application/use-cases/show-establishment.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { EstablishmentPresenter } from '@/infra/http/presenters/establishment.presenter'

const paramsSchema = z.string({
  description: 'O id do estabelecimento é obrigatório.',
})

type ParamsSchema = z.infer<typeof paramsSchema>

@Controller('/establishments')
export class ShowEstablishmentController {
  constructor(private readonly showEstablishment: ShowEstablishmentUseCase) {}

  @Get(':id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(paramsSchema))
  async handle(@Param('id') id: ParamsSchema) {
    const { establishment } = await this.showEstablishment.execute({
      id,
    })

    return EstablishmentPresenter.toHTTP(establishment)
  }
}
