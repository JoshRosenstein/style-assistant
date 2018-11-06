// @flow
import {path, isString} from '@roseys/futils'
import type {getThemePT} from './types'

const GetThemeP = (
  themeKey: string,
  defaultTheme: {},
): getThemePT => key => props => {
  const pth = isString(key) ? `${themeKey}.${key}` : [themeKey, ...key]
  const res = path(pth)(props)
  return res || path(pth)({[themeKey]: defaultTheme})
}

export default GetThemeP
