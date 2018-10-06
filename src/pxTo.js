import {
  pipe,
  flip,
  toString,
  divide,
  when,
  defaultTo,
  round,
  always,
  isNumber,
  isNil
} from '@roseys/futils'

import { isNonZeroNumber, appendString } from './utils'

const divideBy = flip(divide)

const stripUnit = (value, returnUnit) => {
  const unitlessValue = parseFloat(value)

  if (returnUnit) {
    const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/
    if (isNumber(value) || !value.match(cssRegex)) return [value, 0]
    return [unitlessValue, value.match(cssRegex)[2]]
  }
  if (isNil(unitlessValue)) return value
  return unitlessValue
}

export default divisor => unit => num => {
  const [unitless, un] = stripUnit(num, true)
  if (un && un !== 'px') return num
  if (isNonZeroNumber(unitless)) {
    return pipe(
      divideBy(defaultTo(16, divisor)),
      round(3),
      when(
        always(unit),
        pipe(
          toString,
          appendString(unit)
        )
      )
    )(unitless)
  }
  return num
}
