import {
  isEmpty,
  keys,
  prop,
  pick,
  isNil,
  flip,
  defaultTo,
  flow,
} from '@roseys/futils'

import {
  whenFunctionCallWith,
  firstNonNil,
  falseToNull,
  iterateUntilResult
} from './utils'

export default function SwitchProp(
  responsiveProp,
  responsiveBoolProp,
  transformStyle,
  mappedFunctions,
  SwitchPropOptions = {}

) {
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
    }
  ) {
    return function switch_(props) {
      const { default: defaultValue, options: opt = {}, ...matchers } = value
      const {
        transform: parserTransform,
        responsive: parserResponsive,
        responsiveBool: parserResponsiveBool,
        ...parserTransformOpt
      } = opt

      const transformOptions = {
        ...globalTransformOpt,
        ...localTransformOpt,
        ...parserTransformOpt
      }

      const transform = firstNonNil([
        parserTransform,
        localTransform,
        globalTransform
      ])

      const responsive = firstNonNil([
        parserResponsive,
        localResponsive,
        globalResponsive
      ])

      const responsiveBool = firstNonNil([
        parserResponsiveBool,
        localResponsiveBool,
        globalResponsiveBool
      ])

      let transformer = v => v


      if (
        transform ||
        !isEmpty(localTransformOpt) ||
        !isEmpty(parserTransformOpt)
      ) {

        transformer = v =>
          transformStyle({
            value: v,
            cssProp,
            valueOnly: true,
            ...transformOptions
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
          prop: matchedPropName,
          transform
        })(props)
      } else if (responsiveBool) {
        return responsiveBoolProp({
          value: computedValue,
          cssProp,
          prop: matchedPropName,
          transform
        })(props)
      }


      computedValue = transformer(computedValue)

      return valueOnly
        ? computedValue
        : cssProp
          ? { [cssProp]: computedValue }
          : computedValue
    }
  }
}
