import { path, mergeDeepRight } from '@roseys/futils'
import PxTo from './pxTo'
import ToMq from './toMq'
import SwitchProp from './switchProp'
// import SwitchPropValue from './switchPropValue'
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
    //  transform: false
  },
  switchPropOptions: {
    //   transform: false
  },
  parserOptions: {
    //  transform: false
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
const SWITCHPROPVALUE = Symbol('SWITCHPROPVALUE')
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
      this.switchPropOptions
    )

    this[PARSER] = Parser(
      this[SWITCHPROP],
      this[TOMQ],
      this.breakPointsP,
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

  getTheme = key => this[GETTHEMEP](key)

  getThemeWithFallbackKey = (key, fallbackKey = 'default') => props =>
    this[GETTHEMEP](key)(props) || this[GETTHEMEP](fallbackKey)(props)

  getThemeOr = (key, defaultValue) => props =>
    this[GETTHEMEP](key)(props) || defaultValue

  responsive = config => this[RESPONSIVE](config)

  responsiveProp = config => props =>
    this[RESPONSIVEPROP]({ ...this.responsivePropOptions, ...config })(props)
  responsiveBoolP = config => this[RESPONSIVEBOOLPROP](config)
  switchProp = (value, options) => this[SWITCHPROP](value, options)
  switchPropValue = (value, options) => this[SWITCHPROPVALUE](value, options)
  transformStyle = config =>
    this[TRANFORMSTYLEP]({ transform: this.alwaysTransform, ...config })
}

// const styler = new Assistant({
//   defaultTheme: {
//     breakpoints: {
//       mobile: 599,
//       tablet: 768,
//       desktop: 1200,
//       hd: 1800
//     }
//   }
// })

// console.log(styler.breakPointsP('desktop')({}))
// console.log(styler.media.hd({ a: 1 }, v => ({ min: v-1000 })))
