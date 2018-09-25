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
} from '@roseys/futils'
import { isAtRule } from './utils'

const isDimension = test(/[height|width]$/)

const replaceShorthandKeys = mapKeys(x =>
  propOr(x, x, {
    min: 'min-width',
    max: 'max-width',
    minW: 'min-width',
    maxW: 'max-width',
    minH: 'min-height',
    maxH: 'max-height'
  })
)

const objParserCreator = pxToEm => obj => {
  const fn = ([feature, value]) => {
    feature = toKebabCase(feature)
    return flow(
      value,
      when(both(always(isDimension(feature)), isNumber), pxToEm),
      cond([
        [equals(true), always(feature)],
        [equals(false), always(`not ${feature}`)],
        [T, temp => `(${feature}:${temp})`]
      ])
    )
  }

  return flow(
    obj,
    replaceShorthandKeys,
    toPairs,
    map(fn),
    join(' and ')
  )
}

export default function ToMQ(pxToEm) {
  const objParser = objParserCreator(pxToEm)
  return function toMq(config) {
    return pipe(
      cond([
        [both(isString, isAtRule), identity],
        [
          isArray,
          pipe(
            map(objParser),
            join(', ')
          )
        ],
        [
          either(isString, isNumber),
          pipe(
            pxToEm,
            x => ({ screen: true, minWidth: x }),
            objParser
          )
        ],
        [T, objParser]
      ]),
      x => `@media ${x}`
    )(config)
  }
}
