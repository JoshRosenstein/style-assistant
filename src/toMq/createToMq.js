import {
  map,
  mapKeys,
  test,
  always,
  both,
  equals,
  toPairs,
  identity,
  join,
  pipe,
  flow,
  T,
  when,
  cond,
  either,
  propOr,
  toKebabCase,
  isString,
  isNumber,
  isArray,
  isNil,
  path,
} from '@roseys/futils'
import {isAtRule} from '../utils'
import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'

const isDimension = test(/[height|width]$/)

const replaceShorthandKeys = mapKeys(x =>
  propOr(x, x, {
    min: 'min-width',
    max: 'max-width',
    minW: 'min-width',
    maxW: 'max-width',
    minH: 'min-height',
    maxH: 'max-height',
  }),
)

const objParserCreator = valueConverter => obj => {
  const fn = ([feature, value]) => {
    feature = toKebabCase(feature)
    return flow(
      value,
      when(both(always(isDimension(feature)), isNumber), valueConverter),
      cond([
        [equals(true), always(feature)],
        [equals(false), always(`not ${feature}`)],
        [T, temp => `(${feature}:${temp})`],
      ]),
    )
  }

  return flow(
    obj,
    replaceShorthandKeys,
    toPairs,
    map(fn),
    join(' and '),
  )
}

export const createToMq = (methods, options) => {
  let valueConverter = methods['pxToEm'] /// media query values default to em
  if (path('toMq.valueConverter', options)) {
    const converterFromOptions = options.toMq.valueConverter
    if (isFunction(converterFromOptions)) {
      valueConverter = converterFromOptions
    } else {
      if (isFunction(methods[converterFromOptions])) {
        valueConverter = methods[converterFromOptions]
      }
    }
  }

  const objParser = objParserCreator(valueConverter)
  return function toMqF(config) {
    if (isNil(config)) return undefined
    return pipe(
      cond([
        [both(isString, isAtRule), identity],
        [
          isArray,
          pipe(
            map(objParser),
            join(', '),
          ),
        ],
        [
          either(isString, isNumber),
          pipe(
            valueConverter,
            x => ({screen: true, minWidth: x}),
            objParser,
          ),
        ],
        [T, objParser],
      ]),
      when(x => !isAtRule(x), x => `@media ${x}`),
    )(config)
  }
}
createToMq[IDKEY] = ASSISTANTID

export default createToMq
