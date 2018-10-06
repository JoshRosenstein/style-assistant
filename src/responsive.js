import {
  always,
} from '@roseys/futils'
import {
  isResponsiveType,
  isTruthy,
} from './utils'
  
import {  responsiveReducer } from './responsiveHelpers'
  

export const responsive = (toMq, defaultBreakPoints) => ({
  value,
  defaultValue,
  cssProp,
  transformer = always,
  breakpoints = defaultBreakPoints
}) => {
  // / run default Value thru transformer ??
  const defaultResult = defaultValue ? { [cssProp]: defaultValue } : {}
  
  // / if its not responsive value type, return
  if (!isResponsiveType(value)) {
    return !isTruthy(value) ? defaultResult : { [cssProp]: transformer(value) }
  }
  
  return responsiveReducer(
    value,
    breakpoints,
    cssProp,
    transformer,
    toMq,
    defaultResult
  )
}
export default responsive
  