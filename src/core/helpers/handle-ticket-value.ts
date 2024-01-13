type NumericLine = string

export interface Output {
  formatedValue: string
  valueInReais: number
}

const currencyFormat = {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

export const handleTicketValue = (line: NumericLine): Output => {
  const valueInCents = Number(line.slice(-10))
  const valueInReais = valueInCents / 100

  const formatedValue = new Intl.NumberFormat('pt-BR', currencyFormat).format(
    valueInReais,
  )

  return {
    formatedValue,
    valueInReais,
  }
}
