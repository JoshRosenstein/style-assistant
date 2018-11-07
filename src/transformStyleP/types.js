// @flow
import type {getThemePT} from '../getThemeP/types'
import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'
import {ASSISTANTID as TRANSFORMSTYLE} from '../transformStyle/constants'

export type TransformStylePT = any

export type DependentMethodsT = {
  [GETTHEMEP]: getThemePT,
  [TRANSFORMSTYLE]: Function,
  [key: string]: Function,
}
