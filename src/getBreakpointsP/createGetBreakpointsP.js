// @flow

import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'

import getAndCheckMethod from '../shared/getAndCheckMethod'

const getDeps = getAndCheckMethod(ASSISTANTID)

const createGetBreakpointsP = (methods, {breakpointsKey}) => {
  const getTheme = getDeps(GETTHEMEP, methods)
  return key => getTheme([breakpointsKey, key].filter(Boolean))
}
// const newInput = Array.isArray(key)
//   ? [breakpointsKey, ...key].filter(Boolean)
//   : `${breakpointsKey}.${key}`
// return getTheme(newInput)

createGetBreakpointsP[IDKEY] = ASSISTANTID

export default createGetBreakpointsP
