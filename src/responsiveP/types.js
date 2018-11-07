// @flow
import {ASSISTANTID as TOMQ} from '../toMq/constants'
export type CreateResponsivePT = any

export type DependentMethodsT = {
  [TOMQ]: Function,
  [key: string]: Function,
}
