import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ShowZipCodeByAddressUseCase } from '@/domain/application/use-cases/show-zipcode-by-address.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const paramsSchema = z.object({
  address: z.string().min(3, 'O endereço deve conter no mínimo 3 caracteres'),
})

type ParamsSchema = z.infer<typeof paramsSchema>

@Controller('/users')
export class ShowZipCodeByAddressController {
  constructor(private readonly findZipCode: ShowZipCodeByAddressUseCase) {}

  @Post('/search-zip-code-by-address')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(paramsSchema))
  async handle(@Body() body: ParamsSchema) {
    const { address } = body

    const { zipCode } = await this.findZipCode.execute({
      address,
    })

    return {
      zip_code: zipCode,
    }
  }
}
