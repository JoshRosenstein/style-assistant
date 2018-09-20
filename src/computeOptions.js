import { flow, isDefined, isString } from '@roseys/futils'

import { whenFunctionCallWith, isNumber } from './utils'

export default ({
  lookupDefaultOptions,
  getTheme,
  defaultLookups,
  options: globalOptions
}) => ({ val, options: localOptions, selector, props }) => {
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
    doDefaultLookup && lookupDefaultOptions('keys', selector)
  const defaultGetter =
    doDefaultTransform && lookupDefaultOptions('getter', selector)

  if (
    val &&
    (defaultLookup || defaultGetter || getter || postFn || preFn || path)
  ) {
    if (preFn) {
      val = flow(
        preFn,
        whenFunctionCallWith(val, props)
      )
    }

    themeKey = themeKey || path || defaultLookup

    if (isDefined(themeKey) && isString(val)) {
      // Check Strip Negative Before lookingUp
      const isNeg = /^-.+/.test(val)
      val = isNeg ? val.slice(1) : val
      // const themeProp = isDefined(path)
      //   ? `${themeKey}.${val}`
      //   : `theme.${themeKey}.${val}`;
      val = getTheme([themeKey, val])(props) || val

      val = isNeg ? (isNumber(val) ? val * -1 : `-${val}`) : val
    }

    getter = getter || postFn || defaultGetter
    if (getter) {
      //  console.log("getter", lookupDefaultOptions("functions" getter));

      val = flow(
        lookupDefaultOptions('functions', getter),
        whenFunctionCallWith(val, props)
      )
    }
  }
  return val
}
