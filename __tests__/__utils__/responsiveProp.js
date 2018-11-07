import {createResponsiveP} from '../../src/responsiveP'
import getThemeP from './getThemeP'
import transformStyleP from './transformStyle'
import responsive from './responsive'

export default createResponsiveP(
  {
    responsive,
    getThemeP,
    transformStyleP,
  },
  {
    breakpointsKey: 'breakpoints',
  },
)
