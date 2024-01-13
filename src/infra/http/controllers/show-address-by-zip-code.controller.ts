import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ShowAddressByZipCodeUseCase } from '@/domain/application/use-cases/show-address-by-zipcode.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { ZipCodePresenter } from '@/infra/http/presenters/zip-code.presenter'

const paramsSchema = z
  .string()
  .regex(/^\d+$/, 'O cep deve conter apenas números')

type ParamsSchema = z.infer<typeof paramsSchema>

@Controller('/users')
export class ShowAddressByZipCodeController {
  constructor(private readonly findAddress: ShowAddressByZipCodeUseCase) {}

  @Get('search-address-by-zip-code/:id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(paramsSchema))
  async handle(@Param('id') zipCode: ParamsSchema) {
    const address = await this.findAddress.execute({
      zipCode,
    })

    return ZipCodePresenter.toHTTP(address)
  }
}
