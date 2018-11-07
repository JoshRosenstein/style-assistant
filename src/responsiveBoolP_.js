import {prop} from '@roseys/futils'

import {createResponsiveBool} from './responsiveBool'

export default function ResponsiveBoolProp(
  getTheme,
  breakpointsKey,
  toMq,
  transformStyle,
  globalOptions,
) {
  const responsiveBool = createResponsiveBool({toMq})
  return function responsiveBoolProp(config) {
    let {
      value,
      T: trueValue,
      F: falseValue,
      cssProp,
      prop: targetPropName,
      transform,
    } = {...globalOptions, ...config}
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
