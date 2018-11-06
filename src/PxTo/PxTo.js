//@flow
import {pipe, flip, toString, divide, defaultTo, round} from '@roseys/futils'
import type {pxToT} from './types'
/// Todo: Flow not working when not importing directly
import isString from 'typed-is/lib/isString'
import isNumber from 'typed-is/lib/isNumber'
import {isNonZeroNumber, appendString} from '../utils'

const divideBy = flip(divide)

//const divideByC = divideBy2(1)

const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/

const stripUnit = (value: string | number, returnUnit?: boolean) => {
  const unitlessValue = parseFloat(value) || undefined

  if (returnUnit) {
    if (isNumber(value)) return [value, 0]
    if (isString(value)) {
      return !value.match(cssRegex)
        ? [value, 0]
        : [unitlessValue, value.match(cssRegex)[2]]
    }
  }

  return unitlessValue
}

const defaultDivisor: number = 16

type PxToT = (divisor?: number) => pxToT
const PxTo: PxToT = (divisor?: number): pxToT => unit => pxValue => {
  const [maybeUnitlessValue, un] = stripUnit(pxValue, true)
  if (un && un !== 'px') return pxValue
  if (isNonZeroNumber(maybeUnitlessValue)) {
    const possiblyAppendNewUnit = (x: number): number | string =>
      unit
        ? pipe(
            toString,
            appendString(unit),
          )(x)
        : x

    return pipe(
      divideBy(defaultTo(defaultDivisor, divisor)),
      round(3),
      possiblyAppendNewUnit,
    )(maybeUnitlessValue)
  }
  return pxValue
}

export default PxTo
