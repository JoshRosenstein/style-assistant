import { prop } from '@roseys/futils'
import { isT, isF, isBool } from './utils'
import {
  isLikeBreakpoints,
  getBreakPoints,
  responsiveReducer,
  nonBoolsToNil
} from './responsiveHelpers'

export const responsiveBooleanProp = (getTheme, breakpointsKey, toMq) => ({
  log,
  value,
  T: trueValue,
  F: falseValue,
  cssProp,
  prop: targetPropName
}) => props => {
  const css = cssProp || prop

  const matchedProp = prop(targetPropName, props)
  log('INPUTS', {
    value,
    trueValue,
    falseValue,
    cssProp,
    targetPropName
  })

  trueValue = value || trueValue
  if (!isLikeBreakpoints(matchedProp)) {
    if (isBool(matchedProp)) {
      const v = isT(matchedProp)
        ? trueValue
        : isF(matchedProp)
          ? falseValue
          : false
      return v ? { [css]: v } : {}
    }

    return {}
  }

  const { breakpoints, getBp } = getBreakPoints(
    matchedProp,
    getTheme(breakpointsKey)(props),

    log
  )
  log('getBreakPoints Inputs', {
    matchedProp,
    BPS: getTheme(breakpointsKey)(props)
  })
  const computedValFn = currentVal =>
    isT(currentVal) ? trueValue : isF(currentVal) ? falseValue : null

  if (breakpoints && getBp) {
    return responsiveReducer({
      breakpoints,
      getBp,
      css,
      computedValFn,
      toMq
    })
  }
  
}
export default responsiveBooleanProp
