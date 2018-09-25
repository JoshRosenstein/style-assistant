import { flow, isDefined, isString, pathOr,isNumber } from '@roseys/futils'

import { whenFunctionCallWith } from './utils'


export default function TransformStyle(
  getTheme,
  defaultLookups,
  globalOptions
) {

  return function transformStyleProp({
    value: val,
    options: localOptions,
    cssProp,
    valueOnly
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
      return valueOnly ? val : { [cssProp]: val }
    }
  }
}
