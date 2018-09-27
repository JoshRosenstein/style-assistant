import {
  flow,
  isString,
  isNumber,
  when,
  ifElse,
  isDefined,
  pipe,
  objOf
} from '@roseys/futils'

import { whenFunctionCallWith, isTruthy } from './utils'

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
      const options = { ...globalOptions, ...localOptions }
      let {
        key: themeKey,
        getter,
        defaultLookup: doDefaultLookup,
        defaultTransform: doDefaultTransform
      } = options

      const { postFn, preFn, path } = options
      // cant lookup default transformations if no cssProp is provided
      if (!cssProp) {
        doDefaultLookup = false
        doDefaultTransform = false
        valueOnly = true
      }
      const defaultLookup = doDefaultLookup && defaultLookups.keys[cssProp]
      const defaultGetter = doDefaultTransform && defaultLookups.getter[cssProp]
      themeKey = themeKey || path || defaultLookup
      getter = getter || postFn || defaultGetter

      const hasPreFn = () => isDefined(preFn)
      const checkAndCallPreFn = when(hasPreFn, v =>
        whenFunctionCallWith(v, props)(preFn)
      )

      const hasThemeKey = () => isDefined(themeKey)
      const isNeg = v => /^-.+/.test(v)
      const stripNeg = v => (isString(v) ? v.slice(1) : Math.abs(v))
      const toNeg = v => (isNumber(v) ? v * -1 : `-${v}`)
      const getThemeOr = v => getTheme([themeKey, v])(props) || v

      const checkAndCallgetTheme = when(
        hasThemeKey,
        ifElse(
          isNeg,
          pipe(
            stripNeg,
            getThemeOr,
            toNeg
          ),
          getThemeOr
        )
      )

      const hasGetter = () => isTruthy(getter)
      const callGetter = v =>
        flow(
          getter,
          when(isString, x => defaultLookups.functions[x]),
          whenFunctionCallWith(v, props)
        )
      const checkAndCallGetter = when(hasGetter, callGetter)
      const shouldReturnObj = () => !valueOnly

      return pipe(
        when(
          isDefined,
          pipe(
            checkAndCallPreFn,
            checkAndCallgetTheme,
            checkAndCallGetter
          )
        ),
        when(shouldReturnObj, objOf(cssProp))
      )(val)
    }
  }
}
