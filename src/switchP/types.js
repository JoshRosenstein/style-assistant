// @flow
import {ASSISTANTID as RESPONSIVEP} from '../responsiveP/constants'
import {ASSISTANTID as TRANSFORMSTYLEP} from '../transformStyleP/constants'
import {ASSISTANTID as RESPONSIVEBOOLP} from '../responsiveBoolP/constants'

export type SwitchPT = any

export type DependentMethodsT = {
  [RESPONSIVEP]: Function,
  [TRANSFORMSTYLEP]: Function,
  [RESPONSIVEBOOLP]: Function,
  [key: string]: Function,
}
