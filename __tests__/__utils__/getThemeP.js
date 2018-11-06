import {createGetThemeP} from '../../src/getThemeP/'
import defaultTheme from './testThemeObj'

const themeKey = 'theme'
export default createGetThemeP({themeKey, defaultTheme})
