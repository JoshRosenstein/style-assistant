import { flow, isString, pathOr, isNumber } from '@roseys/futils'

import { whenFunctionCallWith } from './utils'

export default function TransformStyle(
  getTheme,
  defaultLookups,
  globalOptions
) {
  return function transformStyleProp({
    value: val,
    cssProp,
    valueOnly,
    ...localOptions
  }) {
    return function transformStyle(props) {
      const lookupDefaultOptions = (dictionary, value) =>
        pathOr(
          dictionary === 'getter' ? null : value,
          `${dictionary}.${value}`,
          defaultLookups
        )

      const options = { ...globalOptions, ...localOptions }
      let { key: themeKey, getter } = options

      const {
        defaultLookup: doDefaultLookup = true,
        defaultTransform: doDefaultTransform = true,
        postFn,
        preFn,
        path
      } = options

      const defaultLookup =
        doDefaultLookup && lookupDefaultOptions('keys', cssProp)
      const defaultGetter =
        doDefaultTransform && lookupDefaultOptions('getter', cssProp)
      themeKey = themeKey || path || defaultLookup
      getter = getter || postFn || defaultGetter

      if (val) {
        if (preFn) {
          val = whenFunctionCallWith(val, props)(preFn)
        }

        if (themeKey) {
          // Check Strip Negative Before lookingUp
          const isNeg = /^-.+/.test(val)

          if (isNeg) {
            val = isString(val) ? val.slice(1) : Math.abs(val)
          }

          val = getTheme([themeKey, val])(props) || val

          val = isNeg ? (isNumber(val) ? val * -1 : `-${val}`) : val
        }

        if (getter) {
          val = flow(
            lookupDefaultOptions('functions', getter),
            whenFunctionCallWith(val, props)
          )
        }
      }
      return valueOnly ? val : { [cssProp]: val }
    }
  }
}
