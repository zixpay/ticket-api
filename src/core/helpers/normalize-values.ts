export const normalizeValue = (value: number) => {
  return parseFloat(value.toString().replace(',', '.'))
}

export const normalizeCellNumber = (cellNumber: string) => {
  return cellNumber.replace(/\D/g, '')
}

export const normalizeDocument = (document: string) => {
  return document.replace(/\D/g, '')
}
