import {
  isNil,
  merge,
  is,
  keys,
  reduce,
  isEmpty,
  last,
  always,
  pipe,
  mergeDeepRight,
  ifElse,
  prop,
  flow,
  toArray,
  isObject,
  pathOr,
  objOf,
  when,
  tap,
  isArray,
  mergeAllDeepRight,
  simplyEquals,
  reject,
  either,
  compact,
  isDefined,
  isPopulated
} from '@roseys/futils'

import {
  whenFunctionCallWith,
  falseToNull,
  splitSelectors,
  isAtRule,
  isTruthy,
  isMQ,
  isTemplate,
  extractTemplateValue,
  safeMapValues
} from '../../src/utils'
import switchProp from './switchProp'
import getTheme from './getTheme'
const safeMergeDeep = a =>
  ifElse(isArray, v => mergeAllDeepRight([a, ...v]), mergeDeepRight(a))

const logger = (prefix, overide) =>
  tap(x =>
    console.log(
      `[PatternBlock][${prefix}]`,
      whenFunctionCallWith(x)(overide) || x
    )
  )

const cleanAndSort = unordered => {
  const ordered = {}
  Object.keys(unordered)
    .sort()
    .forEach(function(key) {
      const val = unordered[key]
      if (isPopulated(val)) {
        if (isObject(val)) {
          ordered[key] = cleanAndSort(val)
        } else {
          ordered[key] = val
        }
      }
    })
  return ordered
}
/// Filter Out undefined Values but if Null then overide previous ones
const a = transform => (value, props) => {
  return flow(
    value,
    // logger('Value'),
    reduce(
      (accumulated, rulesForProp, propName) =>
        flow(
          props,
          // logger('All', { accumulated, rulesForProp, propName, props }),
          ifElse(
            // Skip Undefined or False Values, but not 0's
            x => isTruthy(prop(propName, x)),
            pipe(
              //    logger('TRUE'),
              always(rulesForProp),
              //    logger('rulesForProp'),
              // Call if function on parent Level BLOCK LEVEL
              whenFunctionCallWith(props[propName], props),
              whenFunctionCallWith(props),
              //  logger('rulesForProp'),
              ///On indivdual cssProp Level
              safeMapValues(
                pipe(
                  // whenFunctionCallWith(props[propName], props),
                  //    logger('rulesForPropAfterCall'),
                  whenFunctionCallWith(props)
                )
              ),
              //logger('isArray', v => ({ accum: accumulated, value: v, isArray: isArray(v) })),
              when(isArray, mergeAllDeepRight),
              ///Keep Nulls, tells to overide previous styled
              reject(either(simplyEquals(undefined), isEmpty)),
              mergeDeepRight(accumulated)
              //  safeMerge(accumulated),
              // logger('AfterMerge')
            ),
            always(accumulated)
          )
        ),
      {}
    ),
    /// compact,
    cleanAndSort
  )
}

console.log(
  'Result',
  a(true)(
    {
      size: size => [{ height: getTheme(['space', size]) + 'px' }],
      primary: {
        color: 'blue',
        fontSize: 2
      },
      color: c => ({ color: props => props[c] || c }),
      bg: bg => [
        { backgroundColor: bg },
        switchProp(
          {
            secondary: v => v,
            default: 'defaultValue'
          },
          {
            cssProp: 'marginTop',
            transform: true,
            responsive: true
          }
        ),
        { color: 'yellow' }
      ]
    },
    { primary: true, color: 'red', bg: 'green', secondary: [1, 2], size: 'sm' }
  )
)

const e = switchProp(
  {
    primary: 'primary',
    secondary: v => v,
    default: 'defaultValue'
  },
  { cssProp: 'key' }
)({ primary: null, secondary: null })
console.log(e)
