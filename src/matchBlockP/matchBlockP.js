//@flow

import {
  reduce,
  isEmpty,
  mergeDeepRight,
  prop,
  flow,
  when,
  isArray,
  mergeAllDeepRight,
  simplyEquals,
  reject,
  either,
  all,
  contains,
  isString,
  split,
  toArray,
  whenFunctionCallWith,
  props as getprops,
} from '@roseys/futils'

import {isTruthy, safeMapValues, cleanAndSort} from '../utils'

const splitWhenNoSpace = (keys, delim) =>
  isString(keys)
    ? /\s/g.test(keys)
      ? [keys]
      : split(delim, keys)
    : toArray(keys)
export const NestKey = '$nest'

const matchBlockP = value => props =>
  flow(
    value,
    reduce((accumulated, rulesForProp, propName) => {
      let isMatch = false
      let value
      if (contains(',', propName)) {
        value = flow(
          splitWhenNoSpace(propName, ','),
          x => getprops(x, props),
        )
        isMatch = all(isTruthy, value)
        // isTruthy(prop(propName, props))
      } else {
        value = prop(propName, props)
        isMatch = isTruthy(value)
      }
      return !isMatch
        ? accumulated
        : flow(
            rulesForProp,
            // logger('rulesForProp'),
            // Call if function on parent Level BLOCK LEVEL
            whenFunctionCallWith(value, props),
            whenFunctionCallWith(props),
            // /On indivdual cssProp Level
            safeMapValues(whenFunctionCallWith(props)),
            // logger('isArray', v => ({ accum: accumulated, value: v, isArray: isArray(v) })),
            when(isArray, mergeAllDeepRight),
            // /Keep Nulls, tells to overide previous styled
            reject(either(simplyEquals(undefined), isEmpty)),
            mergeDeepRight(accumulated),
          )
    }, {}),
    // / compact,
    cleanAndSort,
  )

export default matchBlockP
// console.log(
//   matchBlockP({
//     color: { color: 'red' },
//     'variant,color': ([variant, color], props) => ({ color: variant + color })
//   })({ color: 'red', variant: 'Darker' })
// )
