import defaultTheme from "./defaultTheme";
import { path, curryN, type, pathOr, mergeDeepRight } from "@roseys/futils";
import { pxTo } from "./utils";
import toMqCreator from "./toMqCreator";

import switchProp from "./switchProp";
import responsivePropC from "./responsiveProp";
import responsiveBoolPropC from "./responsiveBoolProp";
import computeOptionsCreator from "./computeOptions";
import defaultLookups from "./defaultLookups";

const propendForPath = (value, orderedList) => {
  switch (type(orderedList)) {
    case "String": {
      return `${value}.${orderedList}`;
    }
    case "Array": {
      return [value, ...orderedList];
    }
    default: {
      throw new Error(
        `prepend doesn't know how to deal with ${type(orderedList)}`
      );
    }
  }
};

const getThemeCreate = (themeKey, defaultTheme) => (key, props) => {
  const pth = propendForPath(themeKey, key);
  let res = path(pth)(props);
  return res || path(pth)({ [themeKey]: defaultTheme });
};

export const themeKeyCreateCurried = (themeKey, defaultTheme) =>
  curryN(2, (key, props) => {
    const pth = propendForPath(themeKey, key);
    let res = path(pth)(props);
    return res || path(pth)({ [themeKey]: defaultTheme });
  });

export const getThemeOrCreator = getTheme => (key, defaultValue) => props =>
  getTheme(key)(props) || defaultValue;
const normalize = (value, base, unit = "") =>
  parseFloat(value) / parseFloat(base) + unit;
//todo memorize getters, especially for default theme fallback since theme may change in props

// const lookupDefaultOptions_ = (props, dictionary, value) =>
//   isString(value)
//     ? getAttrFB(
//         `${dictionary}.${value}`,
//         dictionary === "getter" ? null : value
//       )(props)
//     : value;

const lookupDefaultOptionsCreator = defaultDic => (dictionary, value) =>
  pathOr(
    dictionary === "getter" ? null : value,
    `${dictionary}.${value}`,
    defaultDic
  );

const defaultOptions = {
  defaultLookup: true,
  defaultTransform: true,
  defaultTheme,
  defaultLookups,
  baseFontSize: 16,
  themeKey: "theme",
  breakpointsKey: "breakpoints",
  computeOptionsDefaultKeys: defaultLookups.keys,
  computeOptionsDefaultGetters: defaultLookups.getter,
  computeOptionsGetterFunctions: defaultLookups.functions
};

export default class createStyler {
  constructor(options) {
    const mergedOptions = { ...defaultOptions, ...options };
    const {
      defaultTheme,
      themeKey,
      baseFontSize,
      breakpointsKey,
      defaultTransform,
      defaultLookup,
      computeOptionsDefaultKeys,
      computeOptionsDefaultGetters,
      computeOptionsGetterFunctions
    } = mergedOptions;
    this.themeKey = themeKey;
    this.defaultTheme = defaultTheme;
    this.baseFontSize = baseFontSize;
    this.breakpointsKey = breakpointsKey;
    this.computeDefaults = { defaultLookup, defaultTransform };
    this.defaultLookups = {
      keys: computeOptionsDefaultKeys,
      getter: computeOptionsDefaultGetters,
      functions: {
        pxToRem: this.pxToRem,
        pxToEm: this.pxToEm,
        pxToPct: this.pxToPct,
        ...computeOptionsGetterFunctions
      }
    };
    this.defaultBreakpoints = this.defaultTheme[this.breakpointsKey];

    this.debugger = false;
    this.log = (...args) =>
      this.debugger && console.log(this.logPrefix, ...args);
    this.logPrefix = "Assistant Logger";
  }
  pxToRem = pxTo(this.baseFontSize, "rem");
  px = pxTo(1, "px");
  pxToEm = pxTo(this.baseFontSize, "em");
  pxToPct = pxTo(this.baseFontSize, "%");
  pxToRelative = pxTo(this.baseFontSize, false);
  normalize_em = (value, base) =>
    normalize(this.pxToRelative(value), this.pxToRelative(base), "em");
  normalize_rem = (value, base) =>
    normalize(this.pxToRelative(value), this.pxToRelative(base), "rem");

  //styler.toMq([{ screen: true  ,max: 16} => @media screen and (max-width:1em)
  toMq = toMqCreator(this.pxToEm);

  //  styler.getTheme('space.sm',{})
  //  styler.getTheme([space.sm],{}) //returns defaultheme value if no props supplied
  // getTheme = curryN(2, (key, props) => themeKeyCreate(this.themeKey, this.defaultTheme, key,props))
  //getTheme =key=>props=> themeKeyCreate(this.themeKey, this.defaultTheme)(key)(props)
  getDefaultTheme = key =>
    key ? path(key, this.defaultTheme) : this.defaultTheme;
  getTheme = key => props =>
    getThemeCreate(this.themeKey, this.defaultTheme)(key, props);

  getThemeWithFallbackKey = (key, fallbackKey = "default") => props =>
    this.getTheme(key)(props) || this.getTheme(fallbackKey)(props);

  getThemeOr = (key, defaultValue) => props =>
    this.getTheme(key)(props) || defaultValue;

  responsiveProp = ({ defaultValue, prop, cssProp, transformValue }) => props =>
    responsivePropC(this.getTheme, this.breakpointsKey, this.toMq)({
      log: this.log,
      defaultValue,
      transformValue,
      prop,
      cssProp
    })(props);

  switchProp = (value, options) => props =>
    switchProp({
      responsiveBoolProp: this.responsiveBoolProp,
      responsiveProp: this.responsiveProp
    })({
      value,
      props,
      options
    });
  lookupDefaultOptions = (dictionaryKey, value) =>
    lookupDefaultOptionsCreator(this.defaultLookups)(dictionaryKey, value);

  responsiveBoolProp = ({ value, T, F, cssProp, prop }) => props =>
    responsiveBoolPropC(this.getTheme, this.breakpointsKey, this.toMq)({
      log: this.log,
      value,
      T,
      F,
      prop,
      cssProp
    })(props);

  computeOptions = ({ val, options, selector, props }) => props =>
    computeOptionsCreator({
      getTheme: this.getTheme,
      defaultLookups: this.defaultLookups,
      lookupDefaultOptions: this.lookupDefaultOptions,
      options: this.computeDefaults
    })({
      log: this.log,
      val,
      options,
      selector,
      props
    });
  toggleLogger = () => (this.debugger = !this.debugger);
  setLogTitle = str => (this.logPrefix = str);
  mergeDefaultTheme = a => {
    this.defaultTheme = mergeDeepRight(this.defaultTheme, a);
  };
}

const styler = new createStyler({});

// console.log(
//   styler.responsiveBooleanProp({
//     T: "none",
//     F: "block",
//     cssProp: "display",
//     prop: "Target"
//   })({ Target: false })
// );

// console.log(
//   styler.responsiveBooleanProp({
//     T: "none",
//     F: "block",
//     cssProp: "display",
//     prop: "Target"
//   })({ Target: [false, true] })
// );

// console.log(
//   styler.parseResponsive({
//     cssProp: "paddingTop",
//     defaultValue: "16px",
//     prop: "Target",
//     transformValue: (v, props) =>
//       styler.pxToRem(styler.getThemeOr(["space", v], v)(props))
//   })({ Target: [-16, 18] })
// );
// console.log(styler.getDefaultTheme("space.xs"));
// console.log(styler.normalize_em(2, "1rem"));
// console.log(
//   styler.switchProp({
//     primary: "primary",
//     secondary: v => v
//   })({ primary: null, secondary: "Secondary" })
// );

// console.log({
//   myCssProp: styler.switchProp(
//     {
//       primary: "primary",
//       secondary: v => v,
//       default: "defaultValue"
//     },
//     { cssProp: "key" }
//   )({ primary: null, secondary: null })
// });

// console.log(
//   styler.switchProp(
//     {
//       primary: "primary",
//       secondary: v => v,
//       default: "defaultValue"
//     },
//     {
//       cssProp: "marginTop",
//       key: "space",
//       responsive: true,
//       responsiveBool: true
//     }
//   )({ primary: null, secondary: [1, 2] })
// );

// //switch Props with responsive Booleans
// console.log(
//   styler.switchProp(
//     {
//       primary: "primary",
//       secondary: v => v,
//       default: "defaultValue"
//     },
//     {
//       cssProp: "marginTop",
//       key: "space",
//       // responsive: true,
//       responsiveBool: true
//     }
//   )({ primary: null, primary: [true, true] })
// );

// console.log(
//   styler.computeOptions({
//     val: 16,
//     options: {
//       key: "space",
//       getter: "pxToRem",
//       defaultLookup: false,
//       defaultTransform: false
//     },
//     selector: "marginTop"
//   })({})
// );

// styler.mergeDefaultTheme({ colors: { customColor: "myCustom" } })
// console.log(styler.getDefaultTheme('colors.customColor'));
