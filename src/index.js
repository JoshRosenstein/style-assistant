// @flow
import warning from 'warning'
import {path} from '@roseys/futils'
import {PxTo, PXTO} from './PxTo'
import type {pxToT, pxToStr, pxToNum} from './PxTo/types'
import {GetThemeP, name as GETTHEMEP} from './GetThemeP'
import type {getThemePT} from './GetThemeP/types'

import ToMq from './toMq'
import SwitchProp from './switchP'
import ResponsiveProp from './responsiveP'
import ResponsiveBoolP from './responsiveBoolP'
import TransformStyleP from './transformStyleP'
import TransformStyle from './transformStyle'
//import GetThemeP from './getThemeP'
import GetTheme from './getTheme'
import Normalize from './normalize'
import Parser from './parser'
import Responsive from './responsive'
import Media from './media'
import matchBlockP from './matchBlockP'
import {isFunction} from 'typed-is'

const REM = 'rem'
const EM = 'em'

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

const TOMQ_ = 'toMq'
const TRANSFORMSTYLEP = 'transformStyleP'
const RBOOLP = 'responsiveBoolP'
const GETTHEME_ = 'getTheme'
const BREAKPOINTSP_ = 'breakPointsP'
const TRANSFORMSTYLE_ = 'transformStyle'
const TRANSFORMSTYLEP_ = 'transformStyleP'

const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const BASEFONTSIZE = 'baseFontSize'
const PXTOPCT_ = 'pxToPct'
const NORMALIZE_ = 'normalize'
const NORMALIZETOEM_ = 'normalizeToEm'
const NORMALIZETOREM_ = 'normalizeToRem'
const PXTOREL_ = 'pxToRelative'
const RESPONSIVE_ = 'responsive'
const RESPONSIVEP_ = 'responsiveP'
const SWITCHP = 'switchP'

const defaultM = [
  [PXTO, (x, o) => PxTo(o[BASEFONTSIZE])],
  [PXTOREM_, x => x[PXTO](REM)],
  [PXTOEM_, x => x[PXTO](EM)],
  [PXTOPCT_, x => pxValue => x[PXTO]('%')(pxValue * 100)],
  [PXTOREL_, x => x[PXTO]()],
  [NORMALIZE_, x => Normalize(x[PXTO]())],
  [NORMALIZETOEM_, x => x[NORMALIZE_](EM)],
  [NORMALIZETOREM_, x => x[NORMALIZE_](REM)],
  [TOMQ_, m => ToMq(m[PXTOEM_])],
  [
    GETTHEMEP,
    (x, {defaultTheme, themeKey}) => GetThemeP(themeKey, defaultTheme),
  ],
  [
    BREAKPOINTSP_,
    (m, {breakpointsKey}) => key =>
      m[GETTHEMEP]([breakpointsKey, key].filter(Boolean)),
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
            [PXTOREM_]: m[PXTOREM_],
            [PXTOEM_]: m[PXTOEM_],
            [PXTOPCT_]: m[PXTOPCT_],
            ...path('transformOptions.functions', o),
          },
        },
        {
          defaultLookup: path('transformOptions.defaultLookup', o),
          defaultTransform: path('transformOptions.defaultTransform', o),
        },
      ),
  ],
  [TRANSFORMSTYLEP_, m => TransformStyleP(m[TRANSFORMSTYLE_], m[GETTHEMEP])],
  [
    RBOOLP,
    (m, {breakpointsKey}) =>
      ResponsiveBoolP(
        m[GETTHEMEP],
        breakpointsKey,
        m[TOMQ_],
        m[TRANSFORMSTYLEP],
      ),
  ],
  ['media', (m, o) => Media(o.defaultTheme.breakpoints, m.toMq)],

  [RESPONSIVE_, (m, o) => Responsive(m.toMq, o.defaultTheme.breakpoints)],
  [
    RESPONSIVEP_,
    (m, o) =>
      ResponsiveProp(
        m[RESPONSIVE_],
        m[GETTHEMEP],
        o.breakpointsKey,
        m[TRANSFORMSTYLEP_],
        m.responsivePOptions,
      ),
  ],
  [
    SWITCHP,
    (m, o) =>
      SwitchProp(
        m[RESPONSIVEP_],
        m[RBOOLP],
        m[TRANSFORMSTYLEP_],
        {
          [PXTOREM_]: m[PXTOREM_],
          [PXTOEM_]: m[PXTOEM_],
          [PXTOPCT_]: m[PXTOPCT_],
          ...path('transformOptions.functions', o),
        },
        o.switchPOptions,
      ),
  ],
  [
    'parse',
    (m, o) =>
      Parser(m.switchP, m.toMq, m.breakPointsP, m.responsiveP, o.parserOptions),
  ],
  ['matchBlockP', () => matchBlockP],
]

interface AssistantI {
  [PXTO]: pxToT;
  [PXTOPCT_]: pxToStr;
  [PXTOEM_]: pxToStr;
  [PXTOREM_]: pxToStr;
  [GETTHEMEP]: getThemePT;
}

const warnInvalidPlugin = name =>
  warning(
    false,
    '[Assistant]:[INIT]: %s does not have a valid method.',
    '',
    name,
  )

export default class Assistant implements AssistantI {
  constructor(options: Options, methods = defaultM) {
    const mergedOptions = {...defaultOptions, ...options}
    if (methods) {
      let AvailableMethods = {}
      methods.forEach(([name, method]) => {
        if (isFunction(method)) {
          AvailableMethods = {
            ...AvailableMethods,
            [name]: method(AvailableMethods, mergedOptions),
          }
        } else warnInvalidPlugin(name)
      })

      Object.entries(AvailableMethods).forEach(([name, method]) => {
        this[name] = method
      })
    }
  }
}

export const createAssistant: AssistantI = (
  options: Options,
  methods: Array<[string, Function]> = defaultM,
) => {
  let AvailableMethods = {}
  const mergedOptions = {...defaultOptions, ...options}
  if (methods) {
    methods.forEach(([name, method]) => {
      if (isFunction(method)) {
        AvailableMethods = {
          ...AvailableMethods,
          [name]: method(AvailableMethods, mergedOptions),
        }
      } else warnInvalidPlugin(name)
    })
  }
  return Object.freeze(AvailableMethods)
}
