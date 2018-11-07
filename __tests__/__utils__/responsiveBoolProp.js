import {createResponsiveBoolP} from '../../src/responsiveBoolP'
import getThemeP from './getThemeP'
import transformStyleP from './transformStyle'
import responsiveBool from './responsiveBool'
//(getTheme, breakpointsKey, toMq)

const breakpointsKey = 'breakpoints'

export default createResponsiveBoolP(
  {
    getThemeP,
    responsiveBool,
    transformStyleP,
  },
  {breakpointsKey},
)
