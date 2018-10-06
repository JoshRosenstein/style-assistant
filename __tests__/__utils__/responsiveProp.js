import ResponsiveProp from '../../src/responsiveP'
import getThemeP from './getThemeP'
import transformStyle from './transformStyle'
import responsive from './responsive'

export default ResponsiveProp(
  responsive,
  getThemeP,
  'breakpoints',
  transformStyle
)
