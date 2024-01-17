import fs, { existsSync, mkdirSync } from 'node:fs'
import path, { join, resolve } from 'node:path'
import { HttpService as AxiosHttpModule } from '@nestjs/axios'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ExecuteSellOutput } from '@/core/interfaces/sell'
import { firstValueFrom } from 'rxjs'
import * as ExcelJS from 'exceljs'

import {
  normalizeCellNumber,
  normalizeDocument,
} from '@/core/helpers/normalize-values'

import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'

interface Input {
  birthdate: string
  cardNumber: string
  cardOwner: string
  city: string
  complement?: string
  cvc: string
  document: string
  email: string
  expiry: string
  fullValue: string
  name: string
  number: string
  phone: string
  quantity: number
  sellToken: string
  state: string
  street: string
  userIpAddress: string
  zipCode: string
}

// export type Output = boolean

@Injectable()
export class ExecuteSellUseCase {
  constructor(
    private readonly httpService: AxiosHttpModule,
    private readonly establishmentRepository: EstablishmentsRepository,
  ) {}

  async execute(body: Input): Promise<any> {
    const {
      birthdate,
      cardNumber,
      cardOwner,
      phone,
      city,
      complement,
      cvc,
      document,
      email,
      expiry,
      name,
      fullValue,
      number,
      quantity,
      state,
      street,
      userIpAddress,
      zipCode,
      sellToken,
    } = body

    if (quantity > 3) {
      throw new BadRequestException('The maximum number of installments is 3')
    }

    const newSellUrl = 'https://api.zsystems.com.br/vendas'

    const data = {
      cartao: {
        codigoSeguranca: cvc,
        numero: cardNumber,
        titular: cardOwner,
        validade: expiry,
      },
      cliente: {
        celular: normalizeCellNumber(phone),
        cpf: normalizeDocument(document),
        dataNascimento: birthdate,
        email,
        nome: name,
      },
      endereco: {
        cep: zipCode,
        cidade: city,
        complemento: complement || '',
        estado: state,
        logradouro: street,
        numero: number,
      },
      ip: userIpAddress,
      parcelas: quantity,
      splits: [],
      tipoPagamentoId: 3,
      valor: fullValue.replace(',', '.'),
    }

    const realEstateToken =
      await this.establishmentRepository.findByPageUrl(sellToken)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${realEstateToken?.token}`,
    }

    const response = await firstValueFrom(
      this.httpService.post<ExecuteSellOutput>(newSellUrl, data, { headers }),
    )

    const currentDate = new Date()
    const day = currentDate.getDate().toString().padStart(2, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()
    const formattedDate = day + '-' + month + '-' + year
    const fileName = `payments-${formattedDate}.xlsx`

    const dirPath = resolve(__dirname, '..', '..', '..', '..', '..', 'tmp')
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }

    const filePath = join(dirPath, fileName)
    console.log('Arquivo será criado em:', filePath)

    const workbook = new ExcelJS.Workbook()
    let sheet

    if (existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath)
      sheet = workbook.getWorksheet(1)
      if (!sheet) {
        sheet = workbook.addWorksheet('payments - ' + formattedDate)
      }
    } else {
      workbook.creator = 'Zixpay-System'
      const formattedDateISO = `${year}-${month}-${day}`
      workbook.created = new Date(formattedDateISO)
      workbook.calcProperties.fullCalcOnLoad = true
      sheet = workbook.addWorksheet('payments - ' + formattedDate)

      sheet.columns = [
        { header: 'Nome', key: 'nome', width: 40 },
        { header: 'E-mail', key: 'email', width: 50 },
        { header: 'CPF/CNPJ', key: 'cpf-cnpj', width: 15 },
        { header: 'Celular', key: 'celular', width: 15 },
        { header: 'Número do cartão', key: 'número do cartão', width: 10 },
        { header: 'Titular do cartão', key: 'titular do cartão', width: 40 },
        { header: 'Parcelas', key: 'parcelas', width: 5 },
        { header: 'Valor', key: 'valor', width: 30 },
      ]
    }

    const lastRow = sheet.lastRow
    const newRow = sheet.getRow(lastRow.number + 1)
    newRow.values = [
      name,
      email,
      document,
      phone,
      cardNumber.slice(-4),
      cardOwner,
      quantity,
      fullValue,
    ]

    await workbook.xlsx.writeFile(filePath)
    console.log('Arquivo salvo com sucesso.')

    return response?.data?.success?.valueOf()
  }
}
