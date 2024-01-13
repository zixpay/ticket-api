import { Injectable } from '@nestjs/common'
import { differenceInDays, isPast } from 'date-fns'

import { banks } from '@/core/helpers/banks'
import { calculateFees } from '@/core/helpers/calculate-fees'
import { handleTicketValue } from '@/core/helpers/handle-ticket-value'
import { handleTicketPayment } from '@/core/helpers/handle-ticket-payment'
import { handleTicketDeadLine } from '@/core/helpers/handle-ticket-deadline'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments.repository'

export interface Installments {
  initial_value: string
  full_value: string
  quantity: number
  diff: string
  installments: string
}

interface Fees {
  calculatedDailyArrears: number
  finalValue: number
}

interface Input {
  numericLine: string
  pageUrl: string
}

type Output = {
  document: string
  name: string
  value: string
  dueDate: string
  installments: Installments[]
  fees: string
  feesDiff: string
  daysOfDelay: number
  amount: string | number
} | null

@Injectable()
export class ReadNumericLineUseCase {
  constructor(
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  async execute({ numericLine, pageUrl }: Input): Promise<Output> {
    const numericLineBankCode = numericLine.slice(0, 3)

    const foundedBank = banks.filter(
      (bank) => bank.code === +numericLineBankCode,
    )[0]

    const feesInfo = await this.establishmentsRepository.findByPageUrl(pageUrl)

    if (!foundedBank) {
      return null
    }

    const document = foundedBank.document

    const name = foundedBank.name.split(' - ')[1]
    const { formatedValue, valueInReais } = handleTicketValue(numericLine)
    const { basicDate, dueDate } = handleTicketDeadLine(numericLine)

    let fees: Fees = {} as Fees
    let diff: number

    if (isPast(basicDate)) {
      let feesFineValue = 0
      if (feesInfo?.fineValue !== undefined && feesInfo?.fineValue !== null) {
        feesFineValue = +feesInfo?.fineValue
      } else {
        feesFineValue = 0.1
      }

      let feesDailyArrears = 0
      if (
        feesInfo?.dailyArrears !== undefined &&
        feesInfo?.dailyArrears !== null
      ) {
        feesDailyArrears = +feesInfo?.dailyArrears
      } else {
        feesDailyArrears = 0.01
      }

      fees = calculateFees({
        deadline: basicDate,
        fullValue: valueInReais,
        fineValue: feesFineValue,
        dailyArrears: feesDailyArrears,
      })

      diff = fees.finalValue - valueInReais
    } else {
      fees.finalValue = 0
      diff = 0
    }
    const daysOfDelay = differenceInDays(new Date(), basicDate)

    let amount: number | string

    fees.finalValue === 0 ? (amount = valueInReais) : (amount = fees.finalValue)

    const installments = handleTicketPayment(amount)

    const currencyFormat = {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    return {
      document,
      name,
      value: formatedValue,
      dueDate,
      installments,
      fees: new Intl.NumberFormat('pt-BR', currencyFormat).format(
        fees.finalValue,
      ),
      feesDiff: new Intl.NumberFormat('pt-BR', currencyFormat).format(diff),
      daysOfDelay,
      amount: new Intl.NumberFormat('pt-BR', currencyFormat).format(amount),
    }
  }
}
