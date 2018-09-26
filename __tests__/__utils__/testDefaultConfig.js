import defaultLookups from './defaultLookups'
import defaultTheme from './testThemeObj'

export default {
  defaultTheme,
  baseFontSize: 16,
  themeKey: 'theme',
  breakpointsKey: 'breakpoints',
  alwaysTransform: true,
  transformOptions: {
    defaultLookup: true,
    defaultTransform: true,
    keys: defaultLookups.keys,
    getter: defaultLookups.getter,
    functions: defaultLookups.functions
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
