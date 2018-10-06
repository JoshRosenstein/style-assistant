import {
  isArray,
  values,
  prop,
  isNil,
  objOf,
  mergeDeepRight,
  mapValues,
  when,
  noop
} from '@roseys/futils'
import { arrToObj, isBool, isResponsiveType } from './utils'

export const nonBoolsToNil = mapValues(when(x => !isBool(x), noop))

export const boolsToNil = mapValues(when(isBool, noop))

export const getBreakPoints = (breakpoints, breakPointsFromTheme) => {
  const Dummy = 0

  const switchValue =
    (isArray(breakPointsFromTheme) ? 1 : -1) + (isArray(breakpoints) ? 10 : -10)

  //   console.log(switchValue);

  switch (switchValue) {
  case 11: // /both are arrays
    return [Dummy, ...breakPointsFromTheme]

  case -11: // /both are Objects
    return { default: Dummy, ...breakPointsFromTheme }

  case 9: // / Theme is Object
    return arrToObj([Dummy, ...values(breakPointsFromTheme)])

  default:
    // /9 Valueprop is object but theme BP is array throw error
    if (process.env !== 'production') {
      throw Error(
        "You are using Object Literals for responsive props when your BP's is an Array"
      )
    }
  }

  return breakPointsFromTheme
}

export const responsiveReducer = (
  value,
  breakPointsFromTheme,
  css,
  tranformer,
  toMq,
  init = {}
) => {
  let breakpoints = isResponsiveType(value) ? value : [value]
  const transFormedBps = getBreakPoints(breakpoints, breakPointsFromTheme)

  const getBp = x => prop(x, transFormedBps)

  const createParent = css
    ? (isDefault, bpVal) => (isDefault ? css : [toMq(bpVal), css])
    : (isDefault, bpVal) => (isDefault ? [] : toMq(bpVal))

  // /sort Breakpoints
  breakpoints = Object.keys(breakpoints)
    .sort((a, b) => Number.parseFloat(getBp(a)) - Number.parseFloat(getBp(b)))
    .reduce((acc, key) => {
      acc[key] = breakpoints[key]
      return acc
    }, {})

  return (
    breakpoints &&
    Object.keys(breakpoints).reduce((acc, bpKey) => {
      const bpVal = getBp(bpKey)
      if (isNil(bpVal) && bpKey !== 'default') {
        console.warn(
          `Styler could not find a match for breakPoints matching ${bpKey} in ${css} style with `
        )
        return acc
      }

      const currentVal = breakpoints[bpKey]
      const isDefault =
        bpKey === '0' || bpKey === 'default' || bpVal === 0 || bpVal === '0'
      const computedVal = tranformer(currentVal)

      const res = isNil(computedVal)
        ? {}
        : objOf(createParent(isDefault, bpVal), computedVal)

      return mergeDeepRight(acc, res)
    }, init)
  )
}
