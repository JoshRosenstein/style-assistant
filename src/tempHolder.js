
import { path, type, pathOr } from '@roseys/futils'


export const propendForPath = (value, orderedList) => {
  switch (type(orderedList)) {
  case 'String': {
    return `${value}.${orderedList}`
  }
  case 'Array': {
    return [value, ...orderedList]
  }
  default: {
    throw new Error(
      `prepend doesn't know how to deal with ${type(orderedList)}`
    )
  }
  }
}

export const getThemeCreate = (themeKey, defaultTheme) => (key, props) => {
  const pth = propendForPath(themeKey, key)
  const res = path(pth)(props)
  return res || path(pth)({ [themeKey]: defaultTheme })
}


export const normalize = (value, base, unit = '') =>
  parseFloat(value) / parseFloat(base) + unit
// todo memorize getters, especially for default theme fallback since theme may change in props

// const lookupDefaultOptions_ = (props, dictionary, value) =>
//   isString(value)
//     ? getAttrFB(
//         `${dictionary}.${value}`,
//         dictionary === "getter" ? null : value
//       )(props)
//     : value;

export const lookupDefaultOptionsCreator = defaultDic => (dictionary, value) =>
  pathOr(
    dictionary === 'getter' ? null : value,
    `${dictionary}.${value}`,
    defaultDic
  )
