// @flow
import {path} from '@roseys/futils'
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

import {isFunction} from 'typed-is'

type pxToStr = (pxValue: number | string) => string
type pxToNum = (pxValue: number | string) => number

type pxToT = ((unit: undefined) => pxToNum) & ((unit: string) => pxToStr)

const REM = 'rem'
const EM = 'em'
interface ASS {
  pxToRem: pxToStr;
}

interface Options {
  defaultTheme?: {};
  baseFontSize?: number;
  themeKey?: string;
  breakpointsKey?: string;
  alwaysTransform?: boolean;
  transformOptions?: {
    defaultLookup?: boolean,
    defaultTransform?: boolean,
    keys?: {},
    getter?: {},
    functions?: {},
  };
  responsivePOptions?: {};
  switchPOptions?: {};
  parserOptions?: {};
}

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
    functions: {},
  },
  responsivePOptions: {},
  switchPOptions: {},
  parserOptions: {},
}

const responsiveP_ = ({getThemeP, toMq, transformStyleP}, {breakpointsKey}) =>
  ResponsiveBoolP(getThemeP, breakpointsKey, toMq, transformStyleP)

const GETTHEMEP_ = 'getThemeP'
const TOMQ_ = 'toMq'
const TRANSFORMSTYLEP = 'transformStyleP'
const RBOOLP = 'ResponsiveBoolP'
const GETTHEME_ = 'getTheme'
const BREAKPOINTSP_ = 'breakPointsP'
const TRANSFORMSTYLE_ = 'transformStyle'
const TRANSFORMSTYLEP_ = 'transformStyleP'
const PXTO_ = 'pxTo'
const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const BASEFONTSIZE = 'baseFontSize'
const PXTOPCT_ = 'pxToPct'
const NORMALIZE_ = 'normalize'
const NORMALIZETOEM_ = 'normalizeToEm'
const NORMALIZETOREM_ = 'normalizeToRem'
const PXTOREL_ = 'pxToRelative'
//pxToPct: pxToStr = pxValue => this.pxTo('%')(pxValue * 100)
//pxToRelative: pxToNum = this.pxTo()
// pxToRem: pxToStr = this.pxTo(REM)
// pxToEm: pxToStr = this.pxTo(EM)
// pxToPct: pxToStr = pxValue => this.pxTo('%')(pxValue * 100)
// pxToRelative: pxToNum = this.pxTo()
//this.transformStyleP = TransformStyleP(this.transformStyle, this.getThemeP)
//this.getTheme = GetTheme(this.defaultTheme)
//  this.breakPointsP = key =>this.getThemeP([breakpointsKey, key].filter(Boolean))

// pxTo = PxTo(this.baseFontSize)
// pxTo = PxTo(this.baseFontSize)
const defaultM = [
  [PXTO_, (x, o) => PxTo(o[BASEFONTSIZE])],
  [PXTOREM_, (x, o) => x[PXTO_](REM)],
  [PXTOEM_, (x, o) => x[PXTO_](EM)],
  [PXTOPCT_, (x, o) => pxValue => x[PXTO_]('%')(pxValue * 100)],
  [PXTOREL_, x => x[PXTO_]()],
  [NORMALIZE_, x => Normalize(x[PXTO_]())],
  [NORMALIZETOEM_, x => x[NORMALIZE_](EM)],
  [NORMALIZETOREM_, x => x[NORMALIZE_](REM)],
  [
    GETTHEMEP_,
    (x, {defaultTheme, themeKey}) => GetThemeP(themeKey, defaultTheme),
  ],
  [
    BREAKPOINTSP_,
    (m, {breakpointsKey}) => key =>
      m[GETTHEMEP_]([breakpointsKey, key].filter(Boolean)),
  ],
  [
    RBOOLP,
    (m, {breakpointsKey}) =>
      ResponsiveBoolP(
        m[GETTHEMEP_],
        breakpointsKey,
        m[TOMQ_],
        m[TRANSFORMSTYLEP],
      ),
  ],
  [GETTHEME_, (m, {defaultTheme}) => GetTheme(defaultTheme)],
  [
    TRANSFORMSTYLE_,
    (m, o) =>
      TransformStyle(
        m.getTheme,
        {
          keys: path('transformOptions.keys', o),
          getter: path('transformOptions.getter', o),
          functions: {
            pxToRem: m.pxToRem,
            pxToEm: m.pxToEm,
            pxToPct: m.pxToPct,
            ...path('transformOptions.functions', o),
          },
        },
        {
          defaultLookup: path('transformOptions.defaultLookup', o),
          defaultTransform: path('transformOptions.defaultTransform', o),
        },
      ),
  ],
  [
    TRANSFORMSTYLEP_,
    (m, o) => TransformStyleP(m[TRANSFORMSTYLE_], m[GETTHEMEP_]),
  ],
]

export default class Assistant {
  constructor(options: Options, methods = defaultM) {
    const mergedOptions = {...defaultOptions, ...options}
    const {
      defaultTheme,
      themeKey,
      baseFontSize,
      breakpointsKey,
      alwaysTransform,
      responsivePOptions,
      switchPOptions,
      parserOptions,
    } = mergedOptions

    if (methods) {
      let AvailableMethods = {}
      methods.forEach(([name, method]) => {
        // let name, method
        // if (Array.isArray(x)) {
        //   ;[name, method] = x
        // } else {
        //   if (x.name === '') {
        //     throw Error(' Plugins must have name')
        //   }
        //   method = x
        //   name = x.name
        // }
        if (!isFunction(method)) {
          throw Error(`${name} Function is not valid`)
        }
        //  console.log({ name })
        const methodInitialized = method(AvailableMethods, mergedOptions)
        AvailableMethods = {...AvailableMethods, [name]: methodInitialized}
      })

      Object.entries(AvailableMethods).forEach(([name, method]) => {
        this[name] = method
      })
      console.log({AvailableMethods})
    }

    this.parserOptions = parserOptions
    this.responsivePOptions = responsivePOptions
    this.switchPOptions = switchPOptions
    this.alwaysTransform = alwaysTransform
    //  this[THEMEKEY] = themeKey
    this.themeKey = themeKey
    //  this[DEFAULTTHEME] = defaultTheme
    this.defaultTheme = defaultTheme
    //  this[BASEFONTSIZE] = baseFontSize
    this.breakpointsKey = breakpointsKey
    //  this[BREAKPOINTSKEY] = breakpointsKey
    this.computeDefaults = {
      defaultLookup: path('transformOptions.defaultLookup', mergedOptions),
      defaultTransform: path(
        'transformOptions.defaultTransform',
        mergedOptions,
      ),
    }
    this.defaultLookups = {
      keys: path('transformOptions.keys', mergedOptions),
      getter: path('transformOptions.getter', mergedOptions),
      functions: {
        pxToRem: this.pxToRem,
        pxToEm: this.pxToEm,
        pxToPct: this.pxToPct,
        ...path('transformOptions.functions', mergedOptions),
      },
    }

    //this[PXTO] = PxTo(this[BASEFONTSIZE])
    //this[GETTHEME] = GetTheme(this[DEFAULTTHEME])
    this.getTheme = GetTheme(this.defaultTheme)
    this.getThemeP = GetThemeP(this.themeKey, this.defaultTheme)
    // this[GETTHEMEP] = GetThemeP(this[THEMEKEY], this[DEFAULTTHEME])

    this.breakPointsP = key =>
      this.getThemeP([breakpointsKey, key].filter(Boolean))

    //this[TOMQ] = ToMq(this.pxToEm)
    this.toMq = ToMq(this.pxToEm)

    this.media = Media(this.defaultTheme.breakpoints, this.toMq)

    this.transformStyle = TransformStyle(
      this.getTheme,
      this.defaultLookups,
      this.computeDefaults,
    )
    //this.transformStyleP = TransformStyleP(this.transformStyle, this.getThemeP)

    this.responsiveBoolP = ResponsiveBoolP(
      this.getThemeP,
      this.breakpointsKey,
      this.toMq,
      this.transformStyleP,
    )

    this.responsive = Responsive(this.toMq, this.defaultTheme.breakpoints)
    this.responsiveProp = ResponsiveProp(
      this.responsive,
      this.getThemeP,
      this.breakpointsKey,
      this.transformStyleP,
    )

    this.responsiveP = config => props =>
      this.responsiveProp({...this.responsivePOptions, ...config})(props)

    this.switchP = SwitchProp(
      this.responsiveP,
      this.responsiveBoolP,
      this.transformStyleP,
      this.defaultLookups.functions,
      this.switchPOptions,
    )

    this.parse = Parser(
      this.switchP,
      this.toMq,
      this.breakPointsP,
      this.responsiveP,
      this.parserOptions,
    )

    this.matchBlockP = matchBlockP

    this.getThemeP = GetThemeP(this.themeKey, this.defaultTheme)
  }

  get getdefaultTheme() {
    return this.defaultTheme
  }

  /*
Style UTILS

  */
  //pxTo = PxTo(this.baseFontSize)
  //pxToRem: pxToStr = this.pxTo(REM)
  //pxToEm: pxToStr = this.pxTo(EM)
  // pxToPct: pxToStr = pxValue => this.pxTo('%')(pxValue * 100)
  // pxToRelative: pxToNum = this.pxTo()

  //  normalize = Normalize(this[PXTO_]())
  //  normalizeToEm = this.normalize(EM)
  // normalizeToRem = this.normalize(REM)

  // switchPropValue = (value, options) => this[SWITCHPROPVALUE](value, options)
}

// const testMethods = [
//   ['ress', responsiveP_],
//   ['testMethod', (undefined, { defaultTheme }) => defaultTheme.breakpoints]
// ]

interface A {
  [PXTOPCT_]: pxToStr;
  [PXTOEM_]: pxToStr;
  [PXTOREM_]: pxToStr;
  [PXTO_]: pxToT;
}
// const a: A = new Assistant({ defaultTheme: { breakpoints: [1, 2, 4] } })
// const t = a.pxTo('rem')(16)
// console.log(t)
// console.log('testMesthod', testMethod)
