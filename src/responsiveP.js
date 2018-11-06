import {prop} from '@roseys/futils'
import {falseToNull, safeMapValues} from './utils'

export default function ResponsiveProp(
  responsive,
  getTheme,
  breakpointsKey,
  transformStyle,
  globalOptions,
) {
  return function responsiveProp({
    defaultValue,
    value,
    cssProp,
    prop: targetPropName,
    transform,
    ...localoptions
  }) {
    let transformOptions = {...globalOptions, ...localoptions}
    return function responsiveP(props) {
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
            ...transformOptions,
          })(props)
      }

      return responsive({
        value: matchedProp,
        defaultValue,
        cssProp: css,
        transformer,
        breakpoints: getTheme(breakpointsKey)(props),
      })
    }
  }
}
