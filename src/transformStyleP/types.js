// @flow
import type {getThemePT} from '../getThemeP/types'

export type TransformStylePT = any

export type DependentMethodsT = {
  [GETTHEMEP]: getThemePT,
  [TRANSFORMSTYLE]: Function,
  [key: string]: Function,
}
