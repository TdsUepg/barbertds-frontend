const formatDate = (date: string): string => {
  const formatDate = new Date(`${date} 00:00:00`)

  return formatDate.toLocaleDateString('pt-BR')
}

export default formatDate
