import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const bodySchema = z.object({
  establishment: z.string({ description: 'O estabelecimento é obrigatório.' }),
  token: z
    .string({ description: 'O token é obrigatório.' })
    .length(40, 'O token deve ter 40 dígitos.'),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/establishments')
export class CreateEstablishmentController {
  constructor(
    private readonly createEstablishment: CreateEstablishmentUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { token, establishment } = body

    const { pageUrl } = await this.createEstablishment.execute({
      token,
      establishment,
      fineValue: 0.1,
      dailyArrears: 0.01,
    })

    return {
      page_url: pageUrl,
    }
  }
}
