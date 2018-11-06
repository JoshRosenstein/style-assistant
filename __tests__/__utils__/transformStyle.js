import {createTransformStyleP} from '../../src/transformStyleP'
import getThemeP from './getThemeP'
import defaultLookups from './defaultLookups'
import transformStyle from './transformStyle_'

export default createTransformStyleP({transformStyle, getThemeP})
