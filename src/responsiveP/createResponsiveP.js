// @flow
import {IDKEY} from '../constants'
import {ASSISTANTID, OPTIONSKEY} from './constants'
import type {CreateResponsivePT, DependentMethodsT} from './types'

import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'
import {ASSISTANTID as RESPONSIVE} from '../responsive/constants'
import {ASSISTANTID as TRANSFORMSTYLEP} from '../transformStyleP/constants'

import getAndCheckMethod from '../shared/getAndCheckMethod'

import {prop} from '@roseys/futils'
import {falseToNull, safeMapValues} from '../utils'

const getDeps = getAndCheckMethod(ASSISTANTID)

/**
 * @requires getThemeP
 * @requires responsive
 * @requires transformStyleP
 */

const createResponsiveP = (
  methods: DependentMethodsT,
  options,
): CreateResponsivePT => {
  let responsive = getDeps(RESPONSIVE, methods)
  let getTheme = getDeps(GETTHEMEP, methods)
  let transformStyle = getDeps(TRANSFORMSTYLEP, methods)
  let globalOptions = prop(OPTIONSKEY, options)
  let breakpointsKey = prop('breakpointsKey', options) || 'breakpoints'

  return function responsiveProp({
    defaultValue,
    value,
    cssProp,
    prop: targetPropName,
    transform,
    ...localoptions
  }) {
    let transformOptions = {...globalOptions, ...localoptions}
    return function responsiveP(props) {
      const css = cssProp || targetPropName
      targetPropName = targetPropName || cssProp

      let matchedProp = value
      // If no Value is Supplied, then do prop lookup
      if (!matchedProp) {
        matchedProp = prop(targetPropName, props)
      }
      // Convert Flase to Null
      matchedProp = safeMapValues(falseToNull)(matchedProp)

      let transformer = v => v
      if (transform !== false && (transform || transformOptions)) {
        transformer = v =>
          transformStyle({
            value: v,
            cssProp: css,
            valueOnly: true,
            ...transformOptions,
          })(props)
      }

      return responsive({
        value: matchedProp,
        defaultValue,
        cssProp: css,
        transformer,
        breakpoints: getTheme(breakpointsKey)(props),
      })
    }
  }
}

createResponsiveP[IDKEY] = ASSISTANTID

export default createResponsiveP
