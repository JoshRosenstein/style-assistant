import {
  pipe,
  isNil,
  complement,
  flip,
  toString,
  test,
  identity,
  map,
  curryN,
  simplyEquals,
  reduce,
  reduceWhile,
  either,
  concat,
  divide,
  isEmpty,
  is,
  when,
  toArray,
  both,
  pathOr,
  objOf,
  defaultTo,
  attach,
  round,
  mergeAllDeepRight,
  mapKeys,
  not,
  merge,
  isFunction,
  has,
  path,
  always,
  ifElse,
  isArray,
  isObject,
  mapValues
} from "@roseys/futils";

import defaultTheme from "./defaultTheme";

const uniqueID = (prefix = "") => {
  if (/__.$/.test(prefix)) {
    return prefix;
  }

  const hash = Math.random()
    .toString(36)
    .substring(8);

  return `${prefix}__${hash}`;
};

export const uniqifyKeys = mapKeys(uniqueID);
export const safeMapValues = curryN(2, (func, item) =>
  pipe(ifElse(either(isArray, isObject), mapValues(func), func))(item)
);

export const mergeStyles = (...args) => mergeAllDeepRight(args);

export const mergeStylesWithUniqKeys = (...args) =>
  args.reduce((acc, v) => merge(acc, uniqifyKeys(v)), {});

export const isTemplate = test(/{!([^}]+)}/g);
export const evalTemplate = (string, data) =>
  is("String", string)
    ? string.replace(/{!([^}]+)}/g, (_, key) => pathOr(`{!${key}}`, key, data))
    : string;

export const arrToObj = arr =>
  reduce((accumulated, value, key) => attach(key, value, accumulated), {}, arr);

export const isNumber = is("Number");
export const isBool = is("Boolean");
export const isTruthy = either(Boolean, simplyEquals(0));
export const isTrueBool = both(isBool, isTruthy);

export const isF = x => x === false;
export const isT = x => x === true;

export const isNonZeroNumber = both(is("Number"), complement(simplyEquals(0)));
export const appendString = flip(concat);

export const whenisNonZeroNumber = curryN(2, (fn, input) =>
  when(isNonZeroNumber, defaultTo(identity, fn))(input)
);

export const appendUnit = unit =>
  whenisNonZeroNumber(
    pipe(
      toString,
      appendString(unit)
    )
  );

const divideBy = flip(divide);

export const stripUnit = (value, returnUnit) => {
  const unitlessValue = parseFloat(value);

  if (returnUnit) {
    const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
    if (typeof value === "number" || !value.match(cssRegex)) return [value, 0];
    return [unitlessValue, value.match(cssRegex)[2]];
  }
  if (Number.isNaN(unitlessValue)) return value;
  return unitlessValue;
};

export const pxTo = curryN(3, (divisor, unit, num) => {
  const [unitless, un] = stripUnit(num, true);
  if (un && un !== "px") return num;
  if (isNonZeroNumber(unitless)) {
    return pipe(
      divideBy(defaultTo(16, divisor)),
      round(3),
      when(
        always(unit),
        pipe(
          toString,
          appendString(unit)
        )
      )
    )(unitless);
  }
  return num;
});

export const pxToRem = pxTo(16, "rem");
export const pxToEm = pxTo(16, "em");
export const pxToPct = pxTo(16 / 100, "%");
export const px = pxTo(1, "px");
export const rem = appendUnit("rem");
export const em = appendUnit("em");
export const pct = appendUnit("%");
export const ms = appendUnit("ms");
export const isNilOrEmpty = either(isNil, isEmpty);
export const isNotNilOrEmpty = complement(isNilOrEmpty);

// export const isNilOrEmptyOrFalse = either(isNilOrEmpty, simplyEquals(false))
// TODO : remove unessary Split
const getThemeFallback = fallBackObj => (attr, fallback) =>
  pathOr(fallback)(attr)(fallBackObj);

export const getThemeAttrFB = fallBackObj => (
  attr = "",
  defaultTo = ""
) => props => {
  const themeKey = has("$theme", props) ? "$theme" : "theme";
  pathOr(
    getThemeFallback(fallBackObj)(attr, defaultTo),
    concat(themeKey, attr)
  );
};

export const pathWithFallback = fallBackObj => (attr = "", defaultTo = "") =>
  pathOr(getThemeFallback(fallBackObj)(attr, defaultTo), attr);

export const getThemeAttr = getThemeAttrFB(defaultTheme);
export const get = pathWithFallback({ theme: defaultTheme });

export const getTheme = key => props => {
  const themeKey = has("$theme", props) ? "$theme." : "theme.";
  let res = path(concat(themeKey, key))(props);

  return res || path(concat("theme.", key))({ theme: defaultTheme });
};

export const getThemeOr = (key, defaultValue) => props =>
  getTheme(key)(props) || defaultValue;

// export const isNegative = test(/^-.+/)

// export const lookUpValue = curryN(3, (themeKey, val, props) => {
//   // / Check Strip Negative Before lookingUp
//   if (!isString(val)) return val
//   const isNeg = /^-.+/.test(val)
//   const absN = isNeg ? val.slice(1) : val
//
//   val = getThemeAttr(`${themeKey}.${absN}`, val)(props)
//   return isNeg ? (isNumber(val) ? val * -1 : `-${  val}`) : val
// })

export const mapObjOf = curryN(2, (key, val) =>
  pipe(
    toArray,
    map(x => objOf(x, val)),
    mergeAllDeepRight
  )(key)
);

// / For quick nested selectors
// const nester = (k, v) => reduceRight(objOf, v, split('.', k))

// export const UnflattenObj = pipe(
//   toPairs,
//   map(([k_, v_]) => nester(k_, v_)),
//   mergeAllDeepLeft
// )

export const reduceWhileFalsy = curryN(2, (handlerFn, list) =>
  reduceWhile(not, handlerFn, false, list)
);

export const isUndefinedOrFalse = either(isNil, simplyEquals(false));

export const falseToNull = value => {
  if (value === false) return null;
  return value;
};
export const fallbackTo = fallback =>
  pipe(
    falseToNull,
    defaultTo(fallback)
  );
export const iterateUntilResult = computeFn => obj =>
  reduceWhile(isUndefinedOrFalse, computeFn, false, obj);

export const whenFunctionCallWith = (...argsToGive) =>
  when(isFunction, fnItem => fnItem(...argsToGive));

export const isAtRule = selector => selector.indexOf("@") === 0;
export const isMQ = selector => /^(MQ|mq)+/.test(selector);
export const splitSelectors = selectors => {
  if (isAtRule(selectors)) {
    return [selectors];
  }
  const splitted = [];
  let parens = 0;
  let brackets = 0;
  let current = "";
  for (let i = 0, len = selectors.length; i < len; i++) {
    const char = selectors[i];
    if (char === "(") {
      parens += 1;
    } else if (char === ")") {
      parens -= 1;
    } else if (char === "[") {
      brackets += 1;
    } else if (char === "]") {
      brackets -= 1;
    } else if (char === ",") {
      if (!parens && !brackets) {
        splitted.push(current.trim());
        current = "";
        continue;
      }
    }
    current += char;
  }
  splitted.push(current.trim());
  return splitted;
};

export const PROD = process.env.NODE_ENV.trim() === "production";
export const DEV = process.env.NODE_ENV.trim() !== "production";
export const logger = bool => (...args) => {
  if (bool && DEV) {
    console.log(bool, ...args);
  }
};
