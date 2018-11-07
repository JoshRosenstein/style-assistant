// @flow
import warning from 'warning'
import {path} from '@roseys/futils'
import {createPxTo, ASSISTANTID as PXTO} from './pxTo'

import type {pxToT, pxToStr} from './pxTo/types'
import {createGetThemeP} from './getThemeP'
import type {getThemePT} from './getThemeP/types'
import {createResponsiveBool} from './responsiveBool'
import {createResponsiveBoolP} from './responsiveBoolP'
import {createToMq} from './toMq'
import {createSwitchP} from './switchP'
import {createResponsiveP} from './responsiveP'
import {createTransformStyleP} from './transformStyleP'
import {createTransformStyle} from './transformStyle'
import {createGetDefaultTheme} from './getDefaultTheme'
import {createPxToRelative} from './pxToRelative'
// import Normalize from './normalize'
import {createNormalize} from './normalize'
import {createParse} from './parse'
import {createResponsive} from './responsive'
import Media from './media'
import {createMatchBlockP} from './matchBlockP'
import {isFunction} from 'typed-is'
import {IDKEY, ISSTANDALONEKEY} from './constants'
import {createGetBreakpointsP} from './getBreakpointsP'

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

const BASEFONTSIZE = 'baseFontSize'
const PXTOREM_ = 'pxToRem'
const PXTOEM_ = 'pxToEm'
const PXTOPCT_ = 'pxToPct'
const NORMALIZE_ = 'normalize'
const NORMALIZETOEM_ = 'normalizeToEm'
const NORMALIZETOREM_ = 'normalizeToRem'
const PXTOREL_ = 'pxToRelative'

type PX = {[PXTO]: pxToT}

const AllPlugins = [
  createPxTo,

  [PXTOREM_, (x: PX) => x[PXTO](REM)],
  [PXTOEM_, (x: PX) => x[PXTO](EM)],
  [PXTOPCT_, (x: PX) => (pxValue: number) => x[PXTO]('%')(pxValue * 100)],
  createPxToRelative,
  // [PXTOREL_, (x: PX) => x[PXTO]()],
  createNormalize,
  // [NORMALIZE_, (x: PX) => Normalize(x[PXTO]())],
  [NORMALIZETOEM_, (x: PX) => x[NORMALIZE_](EM)],
  [NORMALIZETOREM_, (x: PX) => x[NORMALIZE_](REM)],
  createToMq,
  createGetThemeP,
  createGetBreakpointsP,
  createGetDefaultTheme,
  createTransformStyle,
  createTransformStyleP,
  createResponsiveBool,
  createResponsiveBoolP,
  ['media', (m, o) => Media(o.defaultTheme.breakpoints, m.toMq)],
  createResponsive,
  createResponsiveP,
  createSwitchP,
  createParse,
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
  constructor(options: Options, methods = AllPlugins) {
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
  methods: Array<[string, Function]> = AllPlugins,
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
