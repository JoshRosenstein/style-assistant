import {
  isEmpty,
  keys,
  prop,
  pick,
  isNil,
  flip,
  defaultTo,
  flow
} from "@roseys/futils";

import { whenFunctionCallWith, falseToNull, iterateUntilResult } from "./utils";

export default ({ responsiveProp, responsiveBoolProp, ...globalOptions }) => ({
  value,
  props,
  options: externalOpt = {}
}) => {
  const { default: defaultValue, options: opt = {}, ...matchers } = value;
  const options = { ...globalOptions, ...externalOpt, ...opt };

  let { cssProp, responsive, responsiveBool } = options;

  const intersectedMatchers = keys(pick(keys(matchers), props));
  let matchedPropName;

  let computedValue;
  if (isEmpty(intersectedMatchers) && isNil(defaultValue)) {
    return cssProp ? { [cssProp]: computedValue } : computedValue;
  }

  if (isEmpty(intersectedMatchers) && !isNil(defaultValue)) {
    computedValue = whenFunctionCallWith(props)(defaultValue);
  }

  if (!isEmpty(intersectedMatchers)) {
    computedValue = flow(
      intersectedMatchers,
      iterateUntilResult((previous, propName) => {
        matchedPropName = propName;

        return flow(
          propName,
          flip(prop)(matchers),
          whenFunctionCallWith(props[propName], props),
          whenFunctionCallWith(props)
        );
      }),
      falseToNull,
      defaultTo(whenFunctionCallWith(props)(defaultValue))
    );
  }

  if (!computedValue) {
    return computedValue;
  }

  if (responsive) {
    console.log("Checking If Responsive");
    computedValue = responsiveProp({
      defaultValue: computedValue,
      cssProp,
      prop: matchedPropName
    })(props);
  } else if (responsiveBool) {
    computedValue = responsiveBoolProp({
      value: computedValue,
      cssProp,
      prop: matchedPropName
    })(props);
  } else {
    return cssProp ? { [cssProp]: computedValue } : computedValue;
  }

  return computedValue;
};
