// @flow
import warning from 'warning'
import {path} from '@roseys/futils'
import {PxTo, PXTO} from './PxTo'
import type {pxToT, pxToStr, pxToNum} from './PxTo/types'
import {createGetThemeP, ASSISTANTID as GETTHEMEP} from './getThemeP'
import type {getThemePT} from './getThemeP/types'
import {createResponsiveBool} from './responsiveBool'
import {createResponsiveBoolP} from './responsiveBoolP'
import {createToMq, ASSISTANTID as TOMQ} from './toMq'
import SwitchProp from './switchP'
import ResponsiveProp from './responsiveP'
//import ResponsiveBoolP from './responsiveBoolP'
import {
  createTransformStyleP,
  ASSISTANTID as TRANSFORMSTYLEP,
} from './transformStyleP'
import {
  createTransformStyle,
  ASSISTANTID as TRANSFORMSTYLE,
} from './transformStyle'
//import GetThemeP from './getThemeP'

import {
  createGetDefaultTheme,
  ASSISTANTID as GETDEFAULTTHEME,
} from './getDefaultTheme'

import Normalize from './normalize'
import Parser from './parser'
import {createResponsive, ASSISTANTID as RESPONSIVE} from './responsive'
import Media from './media'
import {createMatchBlockP, ASSISTANTID as MATCHBLOCKP} from './matchBlockP'
import {isFunction} from 'typed-is'
import {IDKEY, ISSTANDALONEKEY} from './constants'
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

const RBOOLP = 'responsiveBoolP'

const BREAKPOINTSP_ = 'breakPointsP'

const BASEFONTSIZE = 'baseFontSize'

const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const PXTOPCT_ = 'pxToPct'
const NORMALIZE_ = 'normalize'
const NORMALIZETOEM_ = 'normalizeToEm'
const NORMALIZETOREM_ = 'normalizeToRem'
const PXTOREL_ = 'pxToRelative'

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
  createToMq,
  createGetThemeP,
  [
    BREAKPOINTSP_,
    (m, {breakpointsKey}) => key =>
      m[GETTHEMEP]([breakpointsKey, key].filter(Boolean)),
  ],
  createGetDefaultTheme,
  createTransformStyle,
  createTransformStyleP,
  createResponsiveBool,
  //[TRANSFORMSTYLEP_, TransformStyleP],
  createResponsiveBoolP,
  // [
  //   RBOOLP,
  //   (m, {breakpointsKey}) =>
  //     ResponsiveBoolP(
  //       m[GETTHEMEP],
  //       breakpointsKey,
  //       m[TOMQ],
  //       m[TRANSFORMSTYLEP],
  //     ),
  // ],
  ['media', (m, o) => Media(o.defaultTheme.breakpoints, m.toMq)],
  createResponsive,
  // [RESPONSIVE, (m, o) => Responsive(m.toMq, o.defaultTheme.breakpoints)],
  [
    RESPONSIVEP_,
    (m, o) =>
      ResponsiveProp(
        m[RESPONSIVE],
        m[GETTHEMEP],
        o.breakpointsKey,
        m[TRANSFORMSTYLEP],
        m.responsivePOptions,
      ),
  ],
  [
    SWITCHP,
    (m, o) =>
      SwitchProp(
        m[RESPONSIVEP_],
        m[RBOOLP],
        m[TRANSFORMSTYLEP],
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
  createMatchBlockP,
]

interface AssistantI {
  [PXTO]: pxToT;
  [PXTOPCT_]: pxToStr;
  [PXTOEM_]: pxToStr;
  [PXTOREM_]: pxToStr;
  [GETTHEMEP]: getThemePT;
}

const warnNamelessPlugin = () =>
  warning(false, '[Assistant]:[creator] Nameless pluggins are not reccomended')

const warnInvalidPlugin = name =>
  warning(
    false,
    '[Assistant]:[creator]: %s does not have a valid method.',
    '',
    name,
  )

export default class Assistant implements AssistantI {
  constructor(options: Options, methods = defaultM) {
    const mergedOptions = {...defaultOptions, ...options}
    if (methods) {
      let AvailableMethods = {}
      methods.forEach(pluginOrNamePluginPair => {
        let name, plugin
        let isStandAlone = false // logic to supply methods to first argument or options only

        if (Array.isArray(pluginOrNamePluginPair)) {
          ;[name, plugin] = pluginOrNamePluginPair
        } else {
          plugin = pluginOrNamePluginPair
          name = pluginOrNamePluginPair[IDKEY]
          if (pluginOrNamePluginPair.hasOwnProperty(ISSTANDALONEKEY)) {
            isStandAlone = pluginOrNamePluginPair[ISSTANDALONEKEY]
          }
        }
        if (isFunction(plugin)) {
          const initFactory = !isStandAlone
            ? plugin(AvailableMethods, mergedOptions)
            : plugin(mergedOptions)
          AvailableMethods = {
            ...AvailableMethods,
            [name]: initFactory,
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
    methods.forEach(pluginOrNamePluginPair => {
      let name, plugin
      if (Array.isArray(pluginOrNamePluginPair)) {
        ;[name, plugin] = pluginOrNamePluginPair
      } else {
        plugin = pluginOrNamePluginPair
        name = pluginOrNamePluginPair[IDKEY]
      }
      if (name === '' || name === undefined) warnNamelessPlugin()
      if (isFunction(plugin)) {
        AvailableMethods = {
          ...AvailableMethods,
          [name]: plugin(AvailableMethods, mergedOptions),
        }
      } else warnInvalidPlugin(name)
    })
  }
  return Object.freeze(AvailableMethods)
}
