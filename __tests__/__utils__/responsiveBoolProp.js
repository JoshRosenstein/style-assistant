import ResponsiveBoolProp from '../../src/responsiveBoolProp'
import getTheme from './getTheme'
import transformStyle from './transformStyle'
import toMq from './toMq'
//(getTheme, breakpointsKey, toMq)

export default ResponsiveBoolProp(getTheme, 'breakpoints', toMq)
