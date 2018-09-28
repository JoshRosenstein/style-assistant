import { prop} from '@roseys/futils'
import { falseToNull, safeMapValues, isResponsiveType } from './utils'

import { getBreakPoints, responsiveReducer } from './responsiveHelpers'

export const responsiveProp = (
  getTheme,
  breakpointsKey,
  toMq,
  transformStyle
) => ({
  defaultValue,
  value,
  cssProp,
  prop: targetPropName,
  transform,
  ...transformOptions
}) => props => {
  const css = cssProp || targetPropName
  targetPropName = targetPropName || cssProp

  let matchedProp = value
  // If no Value is Supplied, then do prop lookup
  if (!matchedProp) {
    matchedProp = prop(targetPropName, props)
  }
  // Convert Flase to Null
  matchedProp = safeMapValues(falseToNull)(matchedProp)

  let transformer = v => v
  if (transform !== false && (transform || transformOptions)) {
    transformer = v =>
      transformStyle({
        value: v,
        cssProp: css,
        valueOnly: true,
        ...transformOptions
      })(props)
  }
  // / run default Value thru transformer ??
  const defaultResult = defaultValue ? { [css]: defaultValue } : {}

  // / if its not responsive value type, return
  if (!isResponsiveType(matchedProp)) {
    return !matchedProp ? defaultResult : { [css]: transformer(matchedProp) }
  }

  const { breakpoints, getBp } = getBreakPoints(
    matchedProp,
    getTheme(breakpointsKey)(props)
  )

  if (breakpoints && getBp) {
    const computedValFn = currentVal => transformer(currentVal)
    return responsiveReducer({
      breakpoints,
      getBp,
      css,
      computedValFn,
      toMq,
      init: defaultResult
    })
  }
}
export default responsiveProp
