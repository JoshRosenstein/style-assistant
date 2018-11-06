// @flow
import {path, isString} from '@roseys/futils'
import type {getThemePT} from './types'
import {IDKEY, ISSTANDALONEKEY} from '../constants'
import {ASSISTANTID} from './constants'

const createGetThemeP = ({
  themeKey,
  defaultTheme,
}): getThemePT => key => props => {
  const pth = isString(key) ? `${themeKey}.${key}` : [themeKey, ...key]
  const res = path(pth)(props)
  return res || path(pth)({[themeKey]: defaultTheme})
}
createGetThemeP[IDKEY] = ASSISTANTID
createGetThemeP[ISSTANDALONEKEY] = true

export default createGetThemeP
