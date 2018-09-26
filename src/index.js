import { path, mergeDeepRight } from '@roseys/futils'
import PxTo from './pxTo'
import ToMq from './toMq'
import SwitchProp from './switchProp'
import ResponsiveProp from './responsiveProp'
import ResponsiveBoolProp from './responsiveBoolProp'
import TransformStyle from './transformStyle'
import GetTheme from './getTheme'
import Normalize from './normalize'
import Parser from './parser'

const defaultOptions = {
  defaultTheme: {},
  baseFontSize: 16,
  themeKey: 'theme',
  breakpointsKey: 'breakpoints',
  alwaysTransform: false,
  transformOptions: {
    defaultLookup: false,
    defaultTransform: false,
    keys: {},
    getter: {},
    functions: {}
  },
  responsivePropOptions: {
    transform: false
  },
  switchPropOptions: {
    transform: false
  },
  parserOptions: {
    transform: false
  }
}

const THEMEKEY = Symbol('theme key')
const TRANFORMSTYLE = Symbol('TransformStyle')
const BASEFONTSIZE = Symbol('baseFontSize')
const BREAKPOINTSKEY = Symbol('breakpointsKey')
const PXTO = Symbol('pxTo')
const RESPONSIVEBOOLPROP = Symbol('ResponsiveBoolProp')
const RESPONSIVEPROP = Symbol('ResponsiveProp')
const DEFAULTTHEME = Symbol('DefaultTheme')
const SWITCHPROP = Symbol('SWITCHPROP')
const GETTHEME = Symbol('getTheme')
const TOMQ = Symbol('TOMQ')
const PARSER = Symbol('Parser')


export default class Assistant {
  constructor(options) {
    const mergedOptions = { ...defaultOptions, ...options }
    const {
      defaultTheme,
      themeKey,
      baseFontSize,
      breakpointsKey,
      alwaysTransform,
      responsivePropOptions,
      switchPropOptions,
      parserOptions
    } = mergedOptions
    this.parserOptions = parserOptions
    this.responsivePropOptions = responsivePropOptions
    this.switchPropOptions = switchPropOptions
    this.alwaysTransform = alwaysTransform
    this[THEMEKEY] = themeKey
    this[DEFAULTTHEME] = defaultTheme
    this[BASEFONTSIZE] = baseFontSize
    this[BREAKPOINTSKEY] = breakpointsKey
    this.computeDefaults = {
      defaultLookup: path('transformOptions.defaultLookup', mergedOptions),
      defaultTransform: path('transformOptions.defaultTransform', mergedOptions)
    }
    this.defaultLookups = {
      keys: path('transformOptions.keys', mergedOptions),
      getter: path('transformOptions.getter', mergedOptions),
      functions: {
        pxToRem: this.pxToRem,
        pxToEm: this.pxToEm,
        pxToPct: this.pxToPct,
        ...path('transformOptions.functions', mergedOptions)
      }
    }

    this[PXTO] = PxTo(this[BASEFONTSIZE])
    this[GETTHEME] = GetTheme(this[THEMEKEY], this[DEFAULTTHEME])
    this[TOMQ] = ToMq(this.pxToEm)

    this[TRANFORMSTYLE] = TransformStyle(
      this[GETTHEME],
      this.defaultLookups,
      this.computeDefaults
    )


    this[RESPONSIVEBOOLPROP] = ResponsiveBoolProp(
      this[GETTHEME],
      this[BREAKPOINTSKEY],
      this[TOMQ],
      this[TRANFORMSTYLE]
    )
    this[RESPONSIVEPROP] = ResponsiveProp(
      this[GETTHEME],
      this[BREAKPOINTSKEY],
      this[TOMQ],
      this[TRANFORMSTYLE]
    )
    this[SWITCHPROP] = SwitchProp(
      this[RESPONSIVEPROP],
      this[RESPONSIVEBOOLPROP],
      this[TRANFORMSTYLE],
      this.defaultLookups.functions,
      this.switchPropOptions
    )

    this[PARSER] = Parser(
      this[SWITCHPROP],
      this[RESPONSIVEPROP],
      this[RESPONSIVEBOOLPROP],
      this[TOMQ],
      this.parserOptions
    )
  }

  get defaultTheme() {
    return this[DEFAULTTHEME]
  }

  /*
Style UTILS

  */
  pxToRem = pxValue => this[PXTO]('rem')(pxValue)
  pxToEm = pxValue => this[PXTO]('em')(pxValue)
  pxToPct = pxValue => this[PXTO]('%')(pxValue)
  pxToRelative = pxValue => this[PXTO](false)(pxValue)

  normalize = Normalize(pxValue => this[PXTO](false)(pxValue))

  normalizeToEm = (value, base) => this.normalize(value, base, 'em')
  normalizeToRem = (value, base) => this.normalize(value, base, 'rem')

  // styler.toMq([{ screen: true  ,max: 16} => @media screen and (max-width:1em)
  toMq = config => this[TOMQ](config)
  parse = config => this[PARSER](config)

  getDefaultTheme = key =>
    key ? path(key, this[DEFAULTTHEME]) : this[DEFAULTTHEME]

  mergeDefaultTheme = a => {
    this[DEFAULTTHEME] = mergeDeepRight(this[DEFAULTTHEME], a)
  }

  /*
PROP DEPENDEND

  */

  getTheme = key => this[GETTHEME](key)

  getThemeWithFallbackKey = (key, fallbackKey = 'default') => props =>
    this[GETTHEME](key)(props) || this[GETTHEME](fallbackKey)(props)

  getThemeOr = (key, defaultValue) => props =>
    this[GETTHEME](key)(props) || defaultValue

  responsiveProp = config => props =>
    this[RESPONSIVEPROP]({ ...this.responsivePropOptions, ...config })(props)
  responsiveBoolProp = config => this[RESPONSIVEBOOLPROP](config)
  switchProp = (value, options) => this[SWITCHPROP](value, options)
  transformStyle = config =>
    this[TRANFORMSTYLE]({ transform: this.alwaysTransform, ...config })

}
