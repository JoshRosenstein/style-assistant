import { prop, flow, isObject, toArray, mapValues } from "@roseys/futils";
import { falseToNull, safeMapValues } from "./utils";

import {
  isLikeBreakpoints,
  getBreakPoints,
  responsiveReducer
} from "./responsiveHelpers";

export const responsiveBooleanProp = (getTheme, breakpointsKey, toMq) => ({
  defaultValue,
  cssProp,
  transformValue = v => v,
  prop: targetPropName
}) => props => {
  const css = cssProp || prop;

  let matchedProp = flow(
    props,
    prop(targetPropName),
    safeMapValues(falseToNull)
  );
  if (isLikeBreakpoints(matchedProp)) {
    matchedProp = mapValues(falseToNull)(matchedProp);
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
  const defaultResult = defaultValue ? { [css]: defaultValue } : {};

  if (!isLikeBreakpoints(matchedProp)) {
    return !matchedProp
      ? defaultResult
      : { [css]: transformValue(matchedProp, props) };
  }

  let { breakpoints, getBp } = getBreakPoints(
    matchedProp,
    getTheme(breakpointsKey)(props)
  );

  if (breakpoints && getBp) {
    const computedValFn = currentVal => transformValue(currentVal, props);
    return responsiveReducer({
      breakpoints,
      getBp,
      css,
      computedValFn,
      toMq,
      init: defaultResult
    });
  }
  return;
};
export default responsiveBooleanProp;
