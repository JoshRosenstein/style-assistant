
import {
    mergeAllDeepRight,
    flow,
    when,
    map,
    isNumber,
    ifElse,
    either,lt,
    complement,
    whenFunctionCallWith,
    identity,
    prop,
    compact
  } from '@roseys/futils'
  
  
  export const px = when(isNumber, num => `${num }px`)
  

  const defaultLookups = {
    keys: {},
    getter: {},
    functions: {
      // Shorthand lookup functions. used in switchP. If value is a string of one of the keys below, then will call corresponding function with corresponding prop value
      identity,
      returnAsIs: identity, // Can add aliases
      propValue: identity, // alias
      self: identity, // alias
      px,
      ms: x => `${parseFloat(x)  }ms`,
      pct: x => {
        x = parseFloat(x)
        x = Math.abs(x) < 1 ? x * 100 : x
        return `${x  }%`
      }
    }
  }
  const defaultTheme = {

    breakpoints: {
      tablet: 640,
      laptop: 832,
      desktop: 1024
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],

    lineHeights: [1, 1.125, 1.25, 1.5],
    fontWeights: {
      normal: 500,
      bold: 'bold'
    },
    letterSpacings: {
      normal: 'normal',
      caps: '0.25em'
    },
    radii: [0, 2, 4, 8],
    borders: [0, '1px solid', '2px solid'],
    shadows: {
      small: '0 0 4px rgba(0, 0, 0, .125)',
      large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    colors: {
      blue: 'blue',
      lightgray: '#f6f6ff'
    }
  }
  
  export default {
    defaultTheme,
    baseFontSize: 16, // / Unitless value used for unit conversions Utils
    themeKey: 'theme', // / Unitless value used for unit conversions Utils
    breakpointsKey: 'breakpoints',
    alwaysTransform: true,
    transformOptions: {
      defaultLookup: true,
      defaultTransform: true,
      keys: defaultLookups.keys,
      getter: defaultLookups.getter,
      functions: defaultLookups.functions
    },
    responsivePOptions: {
      transform: true
    },
    switchPOptions: {
      transform: true,
      responsive:true
    },
    parserOptions: {
      transform: true
    }
  }
  
  
