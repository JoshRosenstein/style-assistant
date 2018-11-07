// @flow
import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import type {CreateResponsiveBoolPT, DependentMethodsT} from './types'
import {ASSISTANTID as RESPONSIVEBOOL} from '../responsiveBool/constants'
import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'
import {ASSISTANTID as TRANSFORMSTYLEP} from '../transformStyleP/constants'
import {prop} from '@roseys/futils'
import getAndCheckMethod from '../shared/getAndCheckMethod'

const getDeps = getAndCheckMethod(ASSISTANTID)

const createResponsiveBoolP = (
  methods: DependentMethodsT,
  {breakpointsKey},
): CreateResponsiveBoolPT => {
  const responsiveBool = getDeps(RESPONSIVEBOOL, methods)
  const transformStyle = getDeps(TRANSFORMSTYLEP, methods)
  const getTheme = getDeps(GETTHEMEP, methods)

  let globalOptions = {}

  return function responsiveBoolProp(config) {
    let {
      value,
      T: trueValue,
      F: falseValue,
      cssProp,
      prop: targetPropName,
      transform,
    } = {...globalOptions, ...config}
    return function responsiveBool_(props) {
      const css = cssProp || targetPropName
      let transformer = v => v

      if (transform) {
        transformer = v =>
          transformStyle({
            value: v,
            cssProp: css,
            valueOnly: true,
          })(props)
      }
      return responsiveBool({
        value: prop(targetPropName, props),
        T: value || trueValue,
        F: falseValue,
        cssProp: css,
        transformer,
        breakpoints: getTheme(breakpointsKey)(props),
      })
    }
  }
}
createResponsiveBoolP[IDKEY] = ASSISTANTID

export default createResponsiveBoolP
