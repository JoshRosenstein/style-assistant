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

export const getBreakPoints = (matchedProp, breakPointsFromTheme) => {
  const Dummy = 0
  // /Prefer Arrays
  if (isResponsiveType(matchedProp)) {
    let breakpoints = []

    const switchValue =
      (isArray(breakPointsFromTheme) ? 1 : -1) +
      (isArray(matchedProp) ? 10 : -10)

    breakpoints = matchedProp

    //   console.log(switchValue);

    switch (switchValue) {
    case 11: // /both are arrays
      breakPointsFromTheme = [Dummy, ...breakPointsFromTheme]
      break
    case -11: // /both are Objects
      breakPointsFromTheme = { default: Dummy, ...breakPointsFromTheme }
      break
    case 9: // / Theme is Object
      breakPointsFromTheme = arrToObj([
        Dummy,
        ...values(breakPointsFromTheme)
      ])
      break
    default:
      // /9 Valueprop is object but theme BP is array throw error
      if (process.env !== 'production') {
        throw Error(
          "You are using Object Literals for responsive props when your BP's is an Array"
        )
      }
    }

    const getBp = x => prop(x, breakPointsFromTheme)

    breakpoints = Object.keys(breakpoints)
      .sort((a, b) => Number.parseFloat(getBp(a)) - Number.parseFloat(getBp(b)))
      .reduce((acc, key) => {
        acc[key] = breakpoints[key]
        return acc
      }, {})

    return { breakpoints, getBp }
  }
}

export const responsiveReducer = ({
  breakpoints,
  getBp,
  css,
  computedValFn,
  toMq,
  init = {}
}) =>
  Object.keys(breakpoints).reduce((acc, bpKey) => {
    const bpVal = getBp(bpKey)
    if (isNil(bpVal) && bpKey !== 'default') {
      console.warn(
        `Styler could not find a match for breakPoints matching ${bpKey} in ${css} style with `
      )
      return acc
    }

    const currentVal = breakpoints[bpKey]

    const computedVal = computedValFn(currentVal)

    const res = isNil(computedVal)
      ? {}
      : bpKey === '0' || bpKey === 'default' || bpVal === 0 || bpVal === '0'
        ? objOf(css, computedVal)
        : objOf([toMq(bpVal), css], computedVal)

    return mergeDeepRight(acc, res)
  }, init)
