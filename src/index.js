import { path } from '@roseys/futils'
import PxTo from './pxTo'
import ToMq from './toMq'
import SwitchProp from './switchP'
import ResponsiveProp from './responsiveP'
import ResponsiveBoolP from './responsiveBoolP'
import TransformStyleP from './transformStyleP'
import TransformStyle from './transformStyle'
import GetThemeP from './getThemeP'
import GetTheme from './getTheme'
import Normalize from './normalize'
import Parser from './parser'
import Responsive from './responsive'
import Media from './media'
import matchBlockP from './matchBlockP'

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
  responsivePOptions: {
 
  },
  switchPOptions: {

  },
  parserOptions: {

  }
}

const THEMEKEY = Symbol('theme key')
const TRANFORMSTYLEP = Symbol('TransformStyleP')
const TRANFORMSTYLE = Symbol('TransformStyle')
const BASEFONTSIZE = Symbol('baseFontSize')
const BREAKPOINTSKEY = Symbol('breakpointsKey')
const PXTO = Symbol('pxTo')
const RESPONSIVEBOOLPROP = Symbol('ResponsiveBoolProp')
const RESPONSIVE = Symbol('responsive')
const RESPONSIVEPROP = Symbol('ResponsiveProp')
const DEFAULTTHEME = Symbol('DefaultTheme')
const SWITCHPROP = Symbol('SWITCHPROP')
const GETTHEMEP = Symbol('getThemeP')
const GETTHEME = Symbol('getTheme')
const TOMQ = Symbol('TOMQ')
const PARSER = Symbol('Parser')
// const MEDIA = Symbol('Media')

export default class Assistant {
  constructor(options) {
    const mergedOptions = { ...defaultOptions, ...options }
    const {
      defaultTheme,
      themeKey,
      baseFontSize,
      breakpointsKey,
      alwaysTransform,
      responsivePOptions,
      switchPOptions,
      parserOptions
    } = mergedOptions
    this.parserOptions = parserOptions
    this.responsivePOptions = responsivePOptions
    this.switchPOptions = switchPOptions
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
    this[GETTHEME] = GetTheme(this[DEFAULTTHEME])
    this[GETTHEMEP] = GetThemeP(this[THEMEKEY], this[DEFAULTTHEME])

    this.breakPointsP = key =>
      this[GETTHEMEP]([breakpointsKey, key].filter(Boolean))

    this[TOMQ] = ToMq(this.pxToEm)
    this.media = Media(this[DEFAULTTHEME].breakpoints, this[TOMQ])
    
    this[TRANFORMSTYLE] = TransformStyle(
      this[GETTHEME],
      this.defaultLookups,
      this.computeDefaults
    )

    this[TRANFORMSTYLEP] = TransformStyleP(this[TRANFORMSTYLE], this[GETTHEMEP])

    this[RESPONSIVEBOOLPROP] = ResponsiveBoolP(
      this[GETTHEMEP],
      this[BREAKPOINTSKEY],
      this[TOMQ],
      this[TRANFORMSTYLEP]
    )
    this[RESPONSIVE] = Responsive(this[TOMQ], this[DEFAULTTHEME].breakpoints)
    this[RESPONSIVEPROP] = ResponsiveProp(
      this[RESPONSIVE],
      this[GETTHEMEP],
      this[BREAKPOINTSKEY],
      this[TRANFORMSTYLEP]
    )
    this[SWITCHPROP] = SwitchProp(
      this[RESPONSIVEPROP],
      this[RESPONSIVEBOOLPROP],
      this[TRANFORMSTYLEP],
      this.defaultLookups.functions,
      this.switchPOptions
    )

    this[PARSER] = Parser(
      this[SWITCHPROP],
      this[TOMQ],
      this.breakPointsP,
      this.parserOptions
    )
    this.matchBlockP=matchBlockP
  }

  get defaultTheme() {
    return this[DEFAULTTHEME]
  }

  /*
Style UTILS

  */
  pxToRem = pxValue => this[PXTO]('rem')(pxValue)
  pxToEm = pxValue => this[PXTO]('em')(pxValue)
  pxToPct = pxValue => this[PXTO]('%')(pxValue*100)
  pxToRelative = pxValue => this[PXTO](false)(pxValue)

  normalize = Normalize(pxValue => this[PXTO](false)(pxValue))
  normalizeToEm = (value, base) => this.normalize(value, base, 'em')
  normalizeToRem = (value, base) => this.normalize(value, base, 'rem')

  toMq = config => this[TOMQ](config)

  parse = config => this[PARSER](config)

  getThemeP = key => this[GETTHEMEP](key)
  getTheme = key => this[GETTHEME](key)

  responsive = config => this[RESPONSIVE](config)
  responsiveP = config => props =>
    this[RESPONSIVEPROP]({ ...this.responsivePOptions, ...config })(props)

  responsiveBoolP = config => this[RESPONSIVEBOOLPROP](config)
  switchP = (value, options) => this[SWITCHPROP](value, options)
  // switchPropValue = (value, options) => this[SWITCHPROPVALUE](value, options)
  transformStyle = config =>
    this[TRANFORMSTYLE](config)


transformStyleP = config =>
  this[TRANFORMSTYLEP](config)
}

