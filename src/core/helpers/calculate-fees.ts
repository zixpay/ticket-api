import { differenceInDays, getDaysInMonth } from 'date-fns'

interface Ticket {
  deadline: Date
  fullValue: number
  fineValue: number
  dailyArrears: number
}

interface Output {
  calculatedDailyArrears: number
  finalValue: number
}

export const calculateFees = ({
  deadline,
  fullValue,
  fineValue,
  dailyArrears,
}: Ticket): Output => {
  const currentDay = new Date()

  const daysOfDelay = differenceInDays(currentDay, deadline)

  if (daysOfDelay <= 0) {
    return {
      calculatedDailyArrears: 0,
      finalValue: 0,
    }
  }

  const calculatedFineValue = fullValue * fineValue

  const daysInMonth = getDaysInMonth(deadline)

  const calculatedDailyArrears =
    (dailyArrears / daysInMonth) * daysOfDelay * fullValue

  const finalValue = fullValue + calculatedDailyArrears + calculatedFineValue

  return {
    calculatedDailyArrears,
    finalValue,
  }
}
