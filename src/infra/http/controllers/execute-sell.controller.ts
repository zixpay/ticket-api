import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import { ExecuteSellUseCase } from '@/domain/application/use-cases/execute-sell.use-case'

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
  zip_code: z.string().regex(/^\d+$/, 'O cep deve conter apenas números'),
  state: z
    .string({ description: 'O cep deve conter 2 letras maiúsculas.' })
    .length(2)
    .toUpperCase()
    .trim(),
  city: z.string({ description: 'O nome da cidade deve conter apenas letras' }),
  street: z.string({ description: 'O nome da rua deve conter apenas letras' }),
  number: z.coerce.string({
    description: 'O número deve conter caracteres e não dígitos',
  }),
  complement: z.string().optional().default('Não informado.'),
  card_number: z
    .string({ description: 'O número do cartão é obrigatório.' })
    .length(19, 'O número do cartão deve ter 16 dígitos.'),
  card_owner: z.string({ description: 'O nome do titular é obrigatório.' }),
  expiry: z.string({ description: 'A expiração é obrigatório.' }),
  cvc: z
    .string({ description: 'O cvc é obrigatório.' })
    .length(3, 'O cvc deve ter 3 dígitos.'),
  quantity: z.coerce.number({ description: 'A quantidade é obrigatória.' }),
  full_value: z.string({ description: 'O valor total é obrigatório.' }),
  sell_token: z.string({ description: 'O token de venda é obrigatório.' }),
  user_ip_address: z.string({ description: 'O ip do usuário é obrigatório.' }),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/establishments')
export class ExecuteSellController {
  constructor(private readonly executeSellUseCase: ExecuteSellUseCase) {}

  @Post('/sell')
  @HttpCode(200)
  async handle(@Body() body: BodySchema) {
    const {
      birthdate,
      card_number: cardNumber,
      card_owner: cardOwner,
      city,
      complement,
      cvc,
      document,
      email,
      expiry,
      full_value: fullValue,
      name,
      number,
      phone,
      quantity,
      sell_token: sellToken,
      state,
      street,
      user_ip_address: userIpAddress,
      zip_code: zipCode,
    } = body

    const success = await this.executeSellUseCase.execute({
      birthdate,
      cardNumber,
      cardOwner,
      city,
      complement,
      cvc,
      document,
      email,
      expiry,
      fullValue,
      name,
      number,
      phone,
      quantity,
      sellToken,
      state,
      street,
      userIpAddress,
      zipCode,
    })

    return success
  }
}
