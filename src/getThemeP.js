import { path, isString } from '@roseys/futils'

export default (themeKey, defaultTheme) => (key = []) => props => {
  const pth = isString(key) ? `${themeKey}.${key}` : [themeKey, ...key]
  const res = path(pth)(props)
  return res || path(pth)({ [themeKey]: defaultTheme })
}
