import {
  flow,
  isString,
  isNumber,
  when,
  ifElse,
  isDefined,
  pipe,
  objOf,
  path,
  whenFunctionCallWith,
} from '@roseys/futils'

import {isTruthy} from '../utils'

const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const PXTOPCT_ = 'pxToPct'

const isNeg = v => /^-.+/.test(v)
const stripNeg = v => (isString(v) ? v.slice(1) : Math.abs(v))
const toNeg = v => (isNumber(v) ? v * -1 : `-${v}`)
export default function TransformStyle(m, o) {
  let getTheme = m.getTheme
  let defaultLookups = {
    keys: path('transformOptions.keys', o),
    getter: path('transformOptions.getter', o),
    functions: {
      [PXTOREM_]: m[PXTOREM_],
      [PXTOEM_]: m[PXTOEM_],
      [PXTOPCT_]: m[PXTOPCT_],
      ...path('transformOptions.functions', o),
    },
  }
  let globalOptions = {
    defaultLookup: path('transformOptions.defaultLookup', o),
    defaultTransform: path('transformOptions.defaultTransform', o),
  }
  return function transformStyle({
    value,
    cssProp,
    valueOnly,
    lookUpfn = getTheme,
    path,
    postFn,
    preFn,
    props,
    ...localOptions
  }) {
    const options = {...globalOptions, ...localOptions}
    let {
      defaultLookup: doDefaultLookup,
      defaultTransform: doDefaultTransform,
    } = options

    // cant lookup default transformations if no cssProp is provided
    if (!cssProp) {
      doDefaultLookup = false
      doDefaultTransform = false
      valueOnly = true
    }
    const defaultLookup = doDefaultLookup && defaultLookups.keys[cssProp]
    const defaultGetter = doDefaultTransform && defaultLookups.getter[cssProp]
    const themeKey = path || defaultLookup
    const getter = postFn || defaultGetter

    const hasPreFn = () => isDefined(preFn)
    const checkAndCallPreFn = when(hasPreFn, v =>
      whenFunctionCallWith(v, props)(preFn),
    )

    const hasThemeKey = () => isDefined(themeKey)

    const getThemeOr = v => lookUpfn([themeKey, v], props) || v

    const checkAndCallgetTheme = when(
      hasThemeKey,
      ifElse(
        isNeg,
        pipe(
          stripNeg,
          getThemeOr,
          toNeg,
        ),
        getThemeOr,
      ),
    )

    const hasGetter = () => isTruthy(getter)
    const callGetter = v =>
      flow(
        getter,
        when(isString, x => defaultLookups.functions[x]),
        whenFunctionCallWith(v, props),
      )
    const checkAndCallGetter = when(hasGetter, callGetter)
    const shouldReturnObj = () => !valueOnly

    return pipe(
      when(
        isDefined,
        pipe(
          checkAndCallPreFn,
          checkAndCallgetTheme,
          checkAndCallGetter,
        ),
      ),
      when(shouldReturnObj, objOf(cssProp)),
    )(value)
  }
}
