import ResponsiveProp from '../../src/responsiveProp'
import getTheme from './getTheme'
import transformStyle from './transformStyle'
import toMq from './toMq'

export default ResponsiveProp(getTheme, 'breakpoints', toMq, transformStyle)
