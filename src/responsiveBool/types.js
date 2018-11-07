// @flow
import {ASSISTANTID as TOMQ} from '../toMq/constants'
export type CreateResponsiveBoolT = any

export type DependentMethodsT = {
  [TOMQ]: Function,
  [key: string]: Function,
}
