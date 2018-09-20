import { path, mergeDeepRight } from '@roseys/futils'
import defaultTheme from './defaultTheme'
import { pxTo} from './utils'
import toMqCreator from './toMqCreator'
import switchProp from './switchProp'
import responsivePropC from './responsiveProp'
import responsiveBoolPropC from './responsiveBoolProp'
import computeOptionsCreator from './computeOptions'
import defaultLookups from './defaultLookups'
import { getThemeCreate,normalize,lookupDefaultOptionsCreator } from './tempHolder'


const defaultOptions = {
  defaultLookup: true,
  defaultTransform: true,
  defaultTheme,
  defaultLookups,
  baseFontSize: 16,
  themeKey: 'theme',
  breakpointsKey: 'breakpoints',
  computeOptionsDefaultKeys: defaultLookups.keys,
  computeOptionsDefaultGetters: defaultLookups.getter,
  computeOptionsGetterFunctions: defaultLookups.functions
}

export default class createStyler {
  constructor(options) {
    const mergedOptions = { ...defaultOptions, ...options }
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
    } = mergedOptions
    this.themeKey = themeKey
    this.defaultTheme = defaultTheme
    this.baseFontSize = baseFontSize
    this.breakpointsKey = breakpointsKey
    this.computeDefaults = { defaultLookup, defaultTransform }
    this.defaultLookups = {
      keys: computeOptionsDefaultKeys,
      getter: computeOptionsDefaultGetters,
      functions: {
        pxToRem: this.pxToRem,
        pxToEm: this.pxToEm,
        pxToPct: this.pxToPct,
        ...computeOptionsGetterFunctions
      }
    }
    this.defaultBreakpoints = this.defaultTheme[this.breakpointsKey]

    this.debugger = false
    this.log = (...args) =>
      this.debugger && console.log(this.logPrefix, ...args)
    this.logPrefix = 'Assistant Logger'
  }

  /*
Style UTILS

  */

  pxToRem = pxTo(this.baseFontSize, 'rem');
  px = pxTo(1, 'px');
  pxToEm = pxTo(this.baseFontSize, 'em');
  pxToPct = pxTo(this.baseFontSize, '%');
  pxToRelative = pxTo(this.baseFontSize, false);
  normalize_em = (value, base) =>
    normalize(this.pxToRelative(value), this.pxToRelative(base), 'em');
  normalize_rem = (value, base) =>
    normalize(this.pxToRelative(value), this.pxToRelative(base), 'rem');

  // styler.toMq([{ screen: true  ,max: 16} => @media screen and (max-width:1em)
  toMq = toMqCreator(this.pxToEm);

  //  styler.getTheme('space.sm',{})
  //  styler.getTheme([space.sm],{}) //returns defaultheme value if no props supplied
  // getTheme = curryN(2, (key, props) => themeKeyCreate(this.themeKey, this.defaultTheme, key,props))
  // getTheme =key=>props=> themeKeyCreate(this.themeKey, this.defaultTheme)(key)(props)
  getDefaultTheme = key =>
    key ? path(key, this.defaultTheme) : this.defaultTheme;

    mergeDefaultTheme = a => {
      this.defaultTheme = mergeDeepRight(this.defaultTheme, a)
    };
        
    /*
  Dependent Tools

    */

  lookupDefaultOptions = (dictionaryKey, value) =>
    lookupDefaultOptionsCreator(this.defaultLookups)(dictionaryKey, value);

    /*
  Temp Tools

    */

  toggleLogger(){this.debugger = !this.debugger}

  setLogTitle (str) {this.logPrefix = str}


  /*
PROP DEPENDEND

  */

  getTheme = key => props =>
    getThemeCreate(this.themeKey, this.defaultTheme)(key, props);

  getThemeWithFallbackKey = (key, fallbackKey = 'default') => props =>
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
    })


  responsiveBoolProp = ({ value, T, F, cssProp, prop }) => props =>
    responsiveBoolPropC(this.getTheme, this.breakpointsKey, this.toMq)({
      log: this.log,
      value,
      T,
      F,
      prop,
      cssProp
    })(props);

  computeOptions = ({ val, options, selector }) => props =>
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

}
