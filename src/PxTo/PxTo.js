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

const getCssValueStringPair = (value: string | number) => {
  const unitlessValue = parseFloat(value) || undefined
  if (isNumber(value)) return [value, 0]
  if (isString(value)) {
    const maybeMatched = value.match(cssRegex)
    if (Array.isArray(maybeMatched)) {
      return [unitlessValue, maybeMatched[2]]
    }
    return [value, 0]
  }

  return [value, 0]
}

const defaultDivisor: number = 16

export const pxTo = (divisor?: number): pxToT => unit => pxValue => {
  if (!(isString(pxValue) || isNumber(pxValue))) {
    return pxValue
  }

  const [maybeUnitlessValue, un] = getCssValueStringPair(pxValue)
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

export default pxTo
