import {
  reduce,
  isEmpty,
  always,
  pipe,
  mergeDeepRight,
  ifElse,
  prop,
  flow,
  when,
  isArray,
  mergeAllDeepRight,
  simplyEquals,
  reject,
  either,
  all,
  contains,isString,split,toArray,
  props as getprops
} from '@roseys/futils'

import {
  whenFunctionCallWith,
  isTruthy,
  safeMapValues,
  cleanAndSort
} from './utils'

const splitWhenNoSpace =(keys,delim) => isString(keys)?/\s/g.test(keys)?[keys]:split(delim,keys):toArray(keys)
export const NestKey = '$nest'
  
// const logger = (prefix, overide) =>
//   tap(x =>
//     console.log(
//       `[PatternBlock][${prefix}]`,
//       whenFunctionCallWith(x)(overide) || x
//     )
//   )
  
// /// Filter Out undefined Values but if Null then overide previous ones
// const NestedMatchBlock = props => rulesForProp => {
//   return reduce(
//     (acc, [key, value]) => {
//       if (key === NestKey) {
//         return { ...acc, ...matchBlockP(value)(props) }
//       }
//       return { ...acc, [key]: value }
//     },
//     {},
//     toPairs(rulesForProp)
//   )
// }
  

export default value => props => 
// const values = keys(value)
// console.log(map(v=>splitWhenNoSpace(v, ','))(values) )
  flow(
    value,
    // logger('Value'),
    reduce((accumulated, rulesForProp, propName) => {
      let isMatch = false
      let value
      if (contains(',', propName)) {
        value = flow(
          splitWhenNoSpace(propName, ','),
          // logger('propNames'),
          x => getprops(x, props)
          //   logger('propValues'),
        )
        isMatch = all(isTruthy, value)
        // isTruthy(prop(propName, props))
      } else {
        value = prop(propName, props)
        isMatch = isTruthy(value)
      }
      return flow(
        rulesForProp,
  
        //  logger('All', { accumulated, rulesForProp, propName, props }),
        ifElse(
          // Skip Undefined or False Values, but not 0's
          always(isMatch),
  
          pipe(
            //    logger('TRUE'),
  
            // logger('rulesForProp'),
            // Call if function on parent Level BLOCK LEVEL
            whenFunctionCallWith(value, props),
            whenFunctionCallWith(props),
            // when(has(NestKey), NestedMatchBlock(props)),
            //  logger('rulesForProp'),
            // /On indivdual cssProp Level
            safeMapValues(
              pipe(
                // whenFunctionCallWith(props[propName], props),
                //    logger('rulesForPropAfterCall'),
                whenFunctionCallWith(props)
              )
            ),
            // logger('isArray', v => ({ accum: accumulated, value: v, isArray: isArray(v) })),
            when(isArray, mergeAllDeepRight),
            // /Keep Nulls, tells to overide previous styled
            reject(either(simplyEquals(undefined), isEmpty)),
            mergeDeepRight(accumulated)
  
            // logger('AfterMerge')
          ),
          always(accumulated)
        )
      )
    }, {}),
    // / compact,
    cleanAndSort
  )
  

// console.log(
//   matchBlockP({
//     color: { color: 'red' },
//     'variant,color': ([variant, color], props) => ({ color: variant + color })
//   })({ color: 'red', variant: 'Darker' })
// )
  