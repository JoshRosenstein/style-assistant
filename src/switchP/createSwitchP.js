// @flow

import {
  isEmpty,
  keys,
  pick,
  isNil,
  defaultTo,
  flow,
  when,
  isString,
  filter,
  isDefined,
  path,
  pathOr,
  prop,
} from '@roseys/futils'

import {
  whenFunctionCallWith,
  firstNonNil,
  falseToNull,
  iterateUntilResult,
  isResponsiveType,
  isTruthy,
  pipeIfDefined,
} from '../utils'

import {IDKEY} from '../constants'
import {ASSISTANTID, OPTIONSKEY} from './constants'
import type {SwitchPT, DependentMethodsT} from './types'

import {ASSISTANTID as RESPONSIVEP} from '../responsiveP/constants'
import {ASSISTANTID as TRANSFORMSTYLEP} from '../transformStyleP/constants'

import {ASSISTANTID as RESPONSIVEBOOLP} from '../responsiveBoolP/constants'

import getAndCheckMethod from '../shared/getAndCheckMethod'

import {
  OPTIONSKEY as TOPTIONSKEY,
  OPTIONFUNCTIONSSKEY,
} from '../transformStyle/constants'

const getDeps = getAndCheckMethod(ASSISTANTID)

const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const PXTOPCT_ = 'pxToPct'

/**
 * @requires responsiveP
 * @requires responsiveBoolP
 * @requires transformStyleP
 */
const createSwitchP = (methods: DependentMethodsT, options): SwitchPT => {
  let responsiveProp = getDeps(RESPONSIVEP, methods)
  let responsiveBoolProp = getDeps(RESPONSIVEBOOLP, methods)
  let transformStyle = getDeps(TRANSFORMSTYLEP, methods)
  let SwitchPropOptions = prop(OPTIONSKEY, options)
  let mappedFunctions = {
    [PXTOREM_]: methods[PXTOREM_],
    [PXTOEM_]: methods[PXTOEM_],
    [PXTOPCT_]: methods[PXTOPCT_],
    ...path([TOPTIONSKEY, OPTIONFUNCTIONSSKEY], options),
  }

  const {
    transform: globalTransform,
    responsive: globalResponsive,
    responsiveBool: globalResponsiveBool,
    ...globalTransformOpt
  } = SwitchPropOptions
  return function switchProp(
    value,
    {
      valueOnly,
      cssProp,
      transform: localTransform,
      responsive: localResponsive,
      responsiveBool: localResponsiveBool,
      ...localTransformOpt
    },
  ) {
    return function switch_(props) {
      const {default: defaultValue, options: opt = {}, ...matchers} = value
      const {
        transform: parserTransform,
        responsive: parserResponsive,
        responsiveBool: parserResponsiveBool,
        ...parserTransformOpt
      } = opt

      const transformOptions = {
        ...globalTransformOpt,
        ...localTransformOpt,
        ...parserTransformOpt,
      }

      const transform = firstNonNil([
        parserTransform,
        localTransform,
        globalTransform,
      ])

      const responsive = firstNonNil([
        parserResponsive,
        localResponsive,
        globalResponsive,
      ])

      const responsiveBool = firstNonNil([
        parserResponsiveBool,
        localResponsiveBool,
        globalResponsiveBool,
      ])

      let transformer = v => v
      let hasBeenTransformed = false
      if (
        transform !== false &&
        (transform ||
          isDefined(localTransformOpt) ||
          isDefined(parserTransformOpt))
      ) {
        transformer = v =>
          transformStyle({
            value: v,
            cssProp,
            valueOnly: true,
            ...transformOptions,
          })(props)
      }
      // /Isuue with Pick when value is 0, fix FUTILS
      const intersectedMatchers = keys(
        pick(keys(matchers), filter(isTruthy, props)),
      )
      let matchedPropName
      // let matchedPropValue

      let computedValue
      if (isEmpty(intersectedMatchers) && isNil(defaultValue)) {
        return valueOnly ? computedValue : cssProp ? {} : computedValue
        //  return cssProp ? { [cssProp]: computedValue } : computedValue
      }

      if (isEmpty(intersectedMatchers) && !isNil(defaultValue)) {
        computedValue = transformer(whenFunctionCallWith(props)(defaultValue))
        hasBeenTransformed = true
      }
      // / NEW BUGGG NOT REMOVING FALSE PROPS
      if (!isEmpty(intersectedMatchers)) {
        computedValue = flow(
          intersectedMatchers,
          iterateUntilResult((previous, propName) => {
            matchedPropName = propName

            return pipeIfDefined(
              when(isString, x => pathOr(x, x, mappedFunctions)),
              whenFunctionCallWith(props[propName], props),
              whenFunctionCallWith(props),
            )(path(propName, matchers))
          }),
          falseToNull,
          defaultTo(whenFunctionCallWith(props)(defaultValue)),
        )
      }

      if (isNil(computedValue)) {
        return computedValue
      }

      if (
        isResponsiveType(computedValue) ||
        isResponsiveType(path(matchedPropName, props))
      ) {
        if (responsiveBool) {
          return responsiveBoolProp({
            value: computedValue,
            cssProp,
            prop: matchedPropName,
            transform,
            ...transformOptions,
          })(props)
        }
        if (responsive) {
          return responsiveProp({
            value: computedValue,
            cssProp,
            prop: matchedPropName,
            transform,
            ...transformOptions,
          })(props)
        }
      }
      computedValue = hasBeenTransformed
        ? computedValue
        : transformer(computedValue)

      return valueOnly
        ? computedValue
        : cssProp
          ? {[cssProp]: computedValue}
          : computedValue
    }
  }
}

createSwitchP[IDKEY] = ASSISTANTID

export default createSwitchP
