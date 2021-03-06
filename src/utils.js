import {
  pipe,
  isNil,
  complement,
  flip,
  toString,
  test,
  identity,
  curryN,
  simplyEquals,
  reduce,
  reduceWhile,
  either,
  concat,
  is,
  when,
  both,
  defaultTo,
  attach,
  isFunction,
  ifElse,
  isArray,
  isObject,
  mapValues,
  isDefined,
  isPopulated
} from '@roseys/futils'

export const cleanAndSort = unordered => {
  const ordered = {}
  Object.keys(unordered)
    .sort()
    .forEach((key) => {
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

export const firstNonNil = reduceWhile(isNil, (a, v) => v, null)
export const isResponsiveType = x => isObject(x) || isArray(x)
export const safeMapValues = curryN(2, (func, item) =>
  pipe(ifElse(either(isArray, isObject), mapValues(func), func))(item)
)

export const isTemplate = test(/{!([^}]+)}/g)
export const pipeIfDefined = (...fns) => when(isDefined, pipe(...fns))
export function extractTemplateValue(template) {
  const rx = new RegExp('{!(.*?)}')
  const values = rx.exec(template) // or: data.match(rx);
  return values && values[1].trim()
}

export const arrToObj = arr =>
  reduce((accumulated, value, key) => attach(key, value, accumulated), {}, arr)

export const isBool = is('Boolean')
export const isTruthy = either(Boolean, simplyEquals(0))

export const isF = x => x === false
export const isT = x => x === true

export const isNonZeroNumber = both(is('Number'), complement(simplyEquals(0)))
export const appendString = flip(concat)

const whenisNonZeroNumber = curryN(2, (fn, input) =>
  when(isNonZeroNumber, defaultTo(identity, fn))(input)
)

export const appendUnit = unit =>
  whenisNonZeroNumber(
    pipe(
      toString,
      appendString(unit)
    )
  )

// export const isNilOrEmpty = either(isNil, isEmpty)
// export const isNotNilOrEmpty = complement(isNilOrEmpty)

const isUndefinedOrFalse = either(isNil, simplyEquals(false))

export const falseToNull = value => {
  if (value === false) return null
  return value
}

export const iterateUntilResult = computeFn => obj =>
  reduceWhile(isUndefinedOrFalse, computeFn, false, obj)

export const whenFunctionCallWith = (...argsToGive) =>
  when(isFunction, fnItem => fnItem(...argsToGive))

export const isAtRule = selector => selector.indexOf('@') === 0
export const isMQ = selector => /^(MQ|mq)+/.test(selector)
export const splitSelectors = selectors => {
  if (isAtRule(selectors)) {
    return [selectors]
  }
  const splitted = []
  let parens = 0
  let brackets = 0
  let current = ''
  for (let i = 0, len = selectors.length; i < len; i++) {
    let char = selectors[i]
    if (char === '(') {
      parens += 1
    } else if (char === ')') {
      parens -= 1
    } else if (char === '[') {
      brackets += 1
    } else if (char === ']') {
      brackets -= 1
    } else if (char === ',') {
      if (!parens && !brackets) {
        splitted.push(current.trim())
        current = ''
        char = ''
      }
    }
    current += char
  }
  splitted.push(current.trim())
  return splitted
}
