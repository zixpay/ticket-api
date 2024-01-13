import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { ShowUserUseCase } from '@/domain/application/use-cases/show-user.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '@/infra/http/presenters/user.presenter'
import { RecipientPresenter } from '@/infra/http/presenters/recipient.presenter'

const bodySchema = z.object({
  document: z
    .string()
    .regex(/^\d+$/, 'O CPF/CNPJ deve conter apenas números')
    .optional(),
  recipient_document: z
    .string()
    .regex(/^\d+$/, 'O CPF/CNPJ deve conter apenas números')
    .optional(),
})

type BodyParams = z.infer<typeof bodySchema>

@Controller('/users')
export class ShowUserController {
  constructor(private readonly showUser: ShowUserUseCase) {}

  @Post('/show')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodyParams) {
    const { document, recipient_document: recipientDocument } = body

    if (!document && !recipientDocument) {
      throw new BadRequestException('Document or recipientDocument is required')
    }

    if (document && recipientDocument) {
      throw new BadRequestException(
        'Please choose either "document" or "recipientDocument", not both.',
      )
    }

    const { user, recipient } = await this.showUser.execute({
      document,
      recipientDocument,
    })

    if (!user && !recipient) {
      throw new NotFoundException('User not found')
    }

    return {
      user: user ? UserPresenter.toHTTP(user) : undefined,
      recipient: recipient ? RecipientPresenter.toHTTP(recipient) : undefined,
    }
  }
}
