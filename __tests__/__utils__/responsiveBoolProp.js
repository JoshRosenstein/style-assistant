import ResponsiveBoolProp from '../../src/responsiveBoolP'
import getThemeP from './getThemeP'
import transformStyle from './transformStyle'
import toMq from './toMq'
//(getTheme, breakpointsKey, toMq)

export default ResponsiveBoolProp(
  getThemeP,
  'breakpoints',
  toMq,
  transformStyle,
)
