import TransformStyleP from '../../src/transformStyleP'
import getThemeP from './getThemeP'
import defaultLookups from './defaultLookups'
import TransformStyle from './transformStyle_'

export default TransformStyleP(TransformStyle, getThemeP, defaultLookups, {
  defaultLookup: true,
  defaultTransform: true
})
