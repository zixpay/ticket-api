type DateString = string
type NumericLine = string
type DayCount = number

const initialDate: DateString = '07/10/1997'

interface DatesOutput {
  dueDate: string
  basicDate: Date
}

export const handleTicketDeadLine = (line: NumericLine): DatesOutput => {
  const daysToAdd: DayCount = Number(line.slice(-14, -10))
  const parts = initialDate.split('/')
  const result = new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0]),
  )
  result.setDate(result.getDate() + daysToAdd)
  const dd = String(result.getDate()).padStart(2, '0')
  const mm = String(result.getMonth() + 1).padStart(2, '0')
  const yyyy = result.getFullYear()
  const basicDate = new Date(`${mm}-${dd}-${yyyy}`)
  const dueDate = `${dd}/${mm}/${yyyy}`

  return {
    dueDate,
    basicDate: new Date(basicDate),
  }
}
