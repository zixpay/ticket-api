import { Installments } from '@/domain/application/use-cases/read-numeric-line.use-case'

const currencyFormat = {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

const formatToReais = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', currencyFormat).format(value)
}

const evaluateFinalValue = (
  initialValue: number,
  interestRate: number,
): number => {
  const value = initialValue * (1 + interestRate)
  return +value.toFixed(2)
}

export const handleTicketPayment = (initialValue: number): Installments[] => {
  const installments: Installments[] = []

  const fullValueOne = evaluateFinalValue(initialValue + 0.49, 0.046901182)
  const diffOne = fullValueOne - initialValue
  const one = {
    initial_value: formatToReais(initialValue),
    full_value: formatToReais(fullValueOne),
    quantity: 1,
    diff: formatToReais(diffOne),
    installments: formatToReais(fullValueOne),
  }

  let fullValueTwo = evaluateFinalValue(initialValue + 0.49, 0.0597711183)
  const diffTwo = fullValueTwo - initialValue

  const decimalsTwo = fullValueTwo.toString().slice(-2)
  if (+decimalsTwo % 2 === 1) {
    fullValueTwo += 0.01
  }

  const installmentsTwo = (fullValueTwo / 2).toFixed(2)

  const two = {
    initial_value: formatToReais(initialValue),
    full_value: formatToReais(fullValueTwo),
    quantity: 2,
    diff: formatToReais(diffTwo),
    installments: formatToReais(+installmentsTwo),
  }

  let fullValueThree = evaluateFinalValue(initialValue + 0.49, 0.0711225773)
  const diffThree = fullValueThree - initialValue

  const decimalsThree = fullValueThree.toString().slice(-2)
  if (+decimalsThree % 2 === 1) {
    fullValueThree += 0.01
  }

  const installmentsThree = fullValueThree / 3

  const three = {
    initial_value: formatToReais(initialValue),
    full_value: formatToReais(fullValueThree),
    quantity: 3,
    diff: formatToReais(diffThree),
    installments: formatToReais(+installmentsThree),
  }

  installments.push(one, two, three)

  return installments
}
