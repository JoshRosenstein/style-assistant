import { prop, flow, isObject, toArray, mapValues } from '@roseys/futils'
import { falseToNull, safeMapValues } from './utils'

import {
  isLikeBreakpoints,
  getBreakPoints,
  responsiveReducer
} from './responsiveHelpers'

export const responsiveBooleanProp = (
  getTheme,
  breakpointsKey,
  toMq,
  transformStyle
) => ({
  defaultValue,
  value,
  cssProp,
  prop: targetPropName,
  transform,
  transformOptions
}) => props => {
  const css = cssProp || prop

  let matchedProp = value
  if (!matchedProp) {
    matchedProp = flow(
      props,
      prop(targetPropName),
      safeMapValues(falseToNull)
    )
  }
  if (isLikeBreakpoints(matchedProp)) {
    matchedProp = mapValues(falseToNull)(matchedProp)
  }

  //   when(
  //     x => isDefined(x) && isLikeBreakpoints(x),
  //     pipe(
  //       boolsToNil,
  //       when(x => isEmpty(compact(x)), always(undefined)),
  //       when(
  //         isDefined,
  //         when(
  //           x => isObject(x) && x.keys.length < 2,
  //           when(x => x.keys[0] === "Default", prop("Default"))
  //         ),
  //         when(x => isArray(x) && x.keys.length < 2, prop("0"))
  //       )
  //     )
  //   )
  // );

  //console.log(isDefined(matchedProp), matchedProp, boolsToNil(matchedProp));
  let transformer = v => v
  if (transform || transformOptions) {
    transformer = v =>
      transformStyle({
        value: v,
        cssProp: css,
        options: transformOptions
      })(props)
  }

  const defaultResult = defaultValue ? { [css]: defaultValue } : {}

  if (!isLikeBreakpoints(matchedProp)) {
    return !matchedProp ? defaultResult : { [css]: transformer(matchedProp) }
  }

  let { breakpoints, getBp } = getBreakPoints(
    matchedProp,
    getTheme(breakpointsKey)(props)
  )

  if (breakpoints && getBp) {
    const computedValFn = currentVal => transformer(currentVal)
    return responsiveReducer({
      breakpoints,
      getBp,
      css,
      computedValFn,
      toMq,
      init: defaultResult
    })
  }
  return
}
export default responsiveBooleanProp
