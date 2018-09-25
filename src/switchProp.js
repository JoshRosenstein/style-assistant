import {
  isEmpty,
  keys,
  prop,
  pick,
  isNil,
  flip,
  defaultTo,
  flow
} from '@roseys/futils'

import { whenFunctionCallWith, falseToNull, iterateUntilResult } from './utils'


export default (
  responsiveProp,
  responsiveBoolProp,
  transformStyle,
  mappedFunctions,
  globalOptions
) => (value, { valueOnly, cssProp, ...externalOpt }) => props => {

  const { default: defaultValue, options: opt = {}, ...matchers } = value
  const options = { ...globalOptions, ...externalOpt, ...opt }

  const { responsive, responsiveBool, transform, transformOptions } = options

  let transformer = v => v

  if (transform || transformOptions) {
    transformer = v =>
      transformStyle({
        value: v,
        cssProp,
        valueOnly: true,
        options: transformOptions
      })(props)
  }

  const intersectedMatchers = keys(pick(keys(matchers), props))
  let matchedPropName


  let computedValue
  if (isEmpty(intersectedMatchers) && isNil(defaultValue)) {
    return valueOnly ? computedValue : cssProp ? {} : computedValue
    //  return cssProp ? { [cssProp]: computedValue } : computedValue
  }

  if (isEmpty(intersectedMatchers) && !isNil(defaultValue)) {
    computedValue = transformer(whenFunctionCallWith(props)(defaultValue))
  }

  if (!isEmpty(intersectedMatchers)) {
    computedValue = flow(
      intersectedMatchers,
      iterateUntilResult((previous, propName) => {
        matchedPropName = propName

        return flow(
          propName,
          flip(prop)(matchers),
          v => mappedFunctions[v] || v,
          whenFunctionCallWith(props[propName], props),
          whenFunctionCallWith(props)
        )
      }),
      falseToNull,
      defaultTo(whenFunctionCallWith(props)(defaultValue))
    )
  }

  if (!computedValue) {
    return computedValue
  }

  if (responsive) {
    return responsiveProp({
      value: computedValue,
      cssProp,
      prop: matchedPropName
    })(props)
  } else if (responsiveBool) {
    return responsiveBoolProp({
      value: computedValue,
      cssProp,
      prop: matchedPropName
    })(props)
  }
  // return cssProp ? { [cssProp]: computedValue } : computedValue


  computedValue = transformer(computedValue)

  return valueOnly
    ? computedValue
    : cssProp
      ? { [cssProp]: computedValue }
      : computedValue
}
