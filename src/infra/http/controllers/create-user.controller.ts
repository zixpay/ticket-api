import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { CreateUserUseCase } from '@/domain/application/use-cases/create-user.use-case'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '@/infra/http/presenters/user.presenter'

const bodySchema = z.object({
  document: z.string().regex(/^\d+$/, 'O CPF/CNPJ deve conter apenas números'),
  email: z
    .string()
    .email('O campo "e-mail" deve ser um endereço de email válido.'),
  name: z.string({ description: 'O nome deve conter apenas letras' }),
  phone: z.string().regex(/^\d+$/, 'A telefone deve conter apenas números'),
  birthdate: z.coerce.string({
    description: 'A data de nascimento deve ser uma string',
  }),
  recipient_document: z
    .string()
    .regex(/^\d*$/, 'O CPF/CNPJ deve conter apenas números')
    .optional(),
  recipient_email: z
    .string()
    .email('O campo "e-mail" deve ser um endereço de email válido.')
    .optional(),
  recipient_name: z
    .string({ description: 'O nome deve conter apenas letras' })
    .optional(),
  recipient_phone: z
    .string()
    .regex(/^\d*$/, 'A telefone deve conter apenas números')
    .optional(),
  recipient_birthdate: z.coerce
    .string({
      description: 'A data de nascimento deve ser uma string',
    })
    .optional(),
  zip_code: z.string().regex(/^\d+$/, 'O cep deve conter apenas números'),
  state: z
    .string({ description: 'O cep deve conter 2 letras maiúsculas.' })
    .length(2)
    .toUpperCase()
    .trim(),
  city: z.string({ description: 'O nome da cidade deve conter apenas letras' }),
  neighborhood: z.string({
    description: 'O nome do bairro deve conter apenas letras',
  }),
  street: z.string({ description: 'O nome da rua deve conter apenas letras' }),
  number: z.coerce.string({
    description: 'O número deve conter caracteres e não dígitos',
  }),
  complement: z.string().optional().default('Não informado.'),
})

type BodyParams = z.infer<typeof bodySchema>

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodyParams) {
    const {
      name,
      document,
      email,
      phone,
      birthdate,
      recipient_name: recipientName,
      recipient_document: recipientDocument,
      recipient_email: recipientEmail,
      recipient_phone: recipientPhone,
      recipient_birthdate: recipientBirthdate,
      zip_code: zipCode,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    } = body

    const { user } = await this.createUser.execute({
      name,
      document,
      email,
      phone,
      birthdate,
      recipientName,
      recipientDocument,
      recipientEmail,
      recipientPhone,
      recipientBirthdate,
      zipCode,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    })

    return UserPresenter.toHTTP(user)
  }
}
