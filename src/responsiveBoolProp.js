import { prop } from '@roseys/futils'
import { isT, isF, isBool, isResponsiveType } from './utils'
import { getBreakPoints, responsiveReducer } from './responsiveHelpers'

export default function ResponsiveBoolProp(
  getTheme,
  breakpointsKey,
  toMq,
  transformStyle
) {
  return function responsiveBoolProp({
    value,
    T: trueValue,
    F: falseValue,
    cssProp,
    prop: targetPropName,
    transform
  }) {
    return function responsiveBool(props) {
      const css = cssProp || prop

      const matchedProp = prop(targetPropName, props)

      trueValue = value || trueValue

      let transformer = v => v

      if (transform) {
        transformer = v =>
          transformStyle({
            value: v,
            cssProp: css,
            valueOnly: true
          })(props)
      }

      if (!isResponsiveType(matchedProp)) {
        if (isBool(matchedProp)) {
          const v = isT(matchedProp)
            ? transformer(trueValue)
            : isF(matchedProp)
              ? transformer(falseValue)
              : false

          return v ? { [css]: v } : {}
        }

        return {}
      }

      const { breakpoints, getBp } = getBreakPoints(
        matchedProp,
        getTheme(breakpointsKey)(props)
      )

      const computedValFn = currentVal =>
        isT(currentVal)
          ? transformer(trueValue)
          : isF(currentVal)
            ? transformer(falseValue)
            : null

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
  }
}
