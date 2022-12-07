/**
 * Returns the sum of the initialTime and the addTime in the 00:00 notation
 * @param initialTime a value in 00:00 notation
 * @param addTime a value between 90, 60, 30 minutes
 */
export default function sumTimes(initialTime: string, addTime: string): string {
  const inititalHour = Number(initialTime.split(':')[0])
  const inititalMinutes = Number(initialTime.split(':')[1])
  let minutes = 0
  let hour = 0

  switch (addTime) {
    case '90':
      minutes = inititalMinutes + 30
      hour = minutes === 60 ? inititalHour + 2 : inititalHour + 1

      return `${hour > 10 ? hour : `0${hour}`}:${
        minutes === 60 ? '00' : minutes
      }`

    case '60':
      hour = inititalHour + 1

      return `${hour > 10 ? hour : `0${hour}`}:${initialTime.split(':')[1]}`

    case '30':
      minutes = inititalMinutes + 30
      hour = minutes === 60 ? inititalHour + 1 : inititalHour

      return `${hour > 10 ? hour : `0${hour}`}:${inititalMinutes + 30}`

    default:
      return initialTime
  }
}
