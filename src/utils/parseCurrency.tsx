const parseCurrency = (value: number): string => {
  const parsedValue = String(value)

  const reais = parsedValue.slice(0, parsedValue.length - 2)
  const cents = parsedValue.slice(parsedValue.length - 2, parsedValue.length)

  return `R$ ${reais},${cents}`
}

export default parseCurrency
