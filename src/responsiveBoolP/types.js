// @flow

import type {getThemePT} from '../getThemeP/types'
import {ASSISTANTID as RESPONSIVEBOOL} from '../responsiveBool/constants'
import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'
import {ASSISTANTID as TRANSFORMSTYLEP} from '../transformStyleP/constants'

export type CreateResponsiveBoolPT = any

export interface DependentMethodsT {
  [GETTHEMEP]: getThemePT;
  [TRANSFORMSTYLE]: Function;
  [RESPONSIVEBOOL]: Function;
  [TRANSFORMSTYLEP]: Function;
  [key: string]: Function;
}
