// @flow
import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import type {CreateResponsiveBoolT, DependentMethodsT} from './types'
import {isT, isF, isBool, isResponsiveType} from '../utils'
import {responsiveReducer} from '../responsiveHelpers'
import {ASSISTANTID as TOMQ} from '../toMq/constants'
import getAndCheckMethod from '../shared/getAndCheckMethod'
const getDeps = getAndCheckMethod(ASSISTANTID)

const createResponsiveBool = (
  methods: DependentMethodsT,
): CreateResponsiveBoolT => {
  const toMq = getDeps(TOMQ, methods)

  return function responsiveBool({
    value,
    T: trueValue,
    F: falseValue,
    cssProp,
    transformer = v => v,
    breakpoints,
  }) {
    const css = cssProp

    if (!isResponsiveType(value)) {
      if (isBool(value)) {
        const v = isT(value)
          ? transformer(trueValue)
          : isF(value)
            ? transformer(falseValue)
            : false

        return v ? {[css]: v} : {}
      }

      return {}
    }

    const computedValFn = currentVal =>
      isT(currentVal)
        ? transformer(trueValue)
        : isF(currentVal)
          ? transformer(falseValue)
          : null

    return responsiveReducer(value, breakpoints, css, computedValFn, toMq)
  }
}
createResponsiveBool[IDKEY] = ASSISTANTID

export default createResponsiveBool
