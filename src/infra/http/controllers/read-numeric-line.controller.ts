import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { ReadNumericLineUseCase } from '@/domain/application/use-cases/read-numeric-line.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const bodySchema = z.object({
  numeric_line: z
    .string()
    .regex(/^\d+$/, 'A linha digitável deve conter apenas números')
    .length(47, 'A linha digitável deve conter 47 caracteres'),
  page_url: z.string({
    description: 'A URL da página deve conter apenas letras',
  }),
})

type BodyParams = z.infer<typeof bodySchema>

@Controller('/users')
export class ReadNumericLineController {
  constructor(private readonly readNumericLine: ReadNumericLineUseCase) {}

  @Post('numeric-line')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodyParams) {
    const { numeric_line: numericLine, page_url: pageUrl } = body

    const data = await this.readNumericLine.execute({
      numericLine,
      pageUrl,
    })

    return {
      document: data?.document,
      name: data?.name,
      value: data?.value,
      due_date: data?.dueDate,
      installments: data?.installments,
      fees: data?.fees,
      fees_diff: data?.feesDiff,
      days_of_delay: data?.daysOfDelay,
      amount: data?.amount,
    }
  }
}
