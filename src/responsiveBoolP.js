import {prop} from '@roseys/futils'

import ResponsiveBool from './responsiveBool'

export default function ResponsiveBoolProp(
  getTheme,
  breakpointsKey,
  toMq,
  transformStyle,
) {
  const responsiveBool = ResponsiveBool(toMq)
  return function responsiveBoolProp({
    value,
    T: trueValue,
    F: falseValue,
    cssProp,
    prop: targetPropName,
    transform,
  }) {
    return function responsiveBool_(props) {
      const css = cssProp || targetPropName
      let transformer = v => v

      if (transform) {
        transformer = v =>
          transformStyle({
            value: v,
            cssProp: css,
            valueOnly: true,
          })(props)
      }
      return responsiveBool({
        value: prop(targetPropName, props),
        T: value || trueValue,
        F: falseValue,
        cssProp: css,
        transformer,
        breakpoints: getTheme(breakpointsKey)(props),
      })
    }
  }
}
