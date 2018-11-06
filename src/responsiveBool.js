import {isT, isF, isBool, isResponsiveType} from './utils'
import {responsiveReducer} from './responsiveHelpers'

export default function ResponsiveBool(toMq) {
  return function responsiveBool({
    value,
    T: trueValue,
    F: falseValue,
    cssProp,
    transformer = v => v,
    breakpoints,
  }) {
    const css = cssProp

    if (!isResponsiveType(value)) {
      if (isBool(value)) {
        const v = isT(value)
          ? transformer(trueValue)
          : isF(value)
            ? transformer(falseValue)
            : false

        return v ? {[css]: v} : {}
      }

      return {}
    }

    const computedValFn = currentVal =>
      isT(currentVal)
        ? transformer(trueValue)
        : isF(currentVal)
          ? transformer(falseValue)
          : null

    return responsiveReducer(value, breakpoints, css, computedValFn, toMq)
  }
}
