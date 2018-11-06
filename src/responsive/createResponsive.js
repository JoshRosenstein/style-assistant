// @flow
import {always, prop} from '@roseys/futils'
import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'

import {isResponsiveType, isTruthy} from '../utils'

import {responsiveReducer} from '../responsiveHelpers'

export const createResponsive = ({toMq}, {breakpointsKey, defaultTheme}) => {
  let defaultBreakPoints = prop(breakpointsKey, defaultTheme)
  return ({
    value,
    defaultValue,
    cssProp,
    transformer = always,
    breakpoints = defaultBreakPoints,
  }) => {
    // / run default Value thru transformer ??
    const defaultResult = defaultValue ? {[cssProp]: defaultValue} : {}

    // / if its not responsive value type, return
    if (!isResponsiveType(value)) {
      return !isTruthy(value) ? defaultResult : {[cssProp]: transformer(value)}
    }

    return responsiveReducer(
      value,
      breakpoints,
      cssProp,
      transformer,
      toMq,
      defaultResult,
    )
  }
}
createResponsive[IDKEY] = ASSISTANTID

export default createResponsive
