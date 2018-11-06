// @flow
import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import type {TransformStylePT, DependentMethodsT} from './types'
import {prop} from '@roseys/futils'
import {ASSISTANTID as GETTHEMEP} from '../getThemeP/constants'

import {ASSISTANTID as TRANSFORMSTYLE} from '../transformStyle/constants'

const createTransformStyleP = (
  methods: DependentMethodsT,
): TransformStylePT => {
  let transformStyle = prop(TRANSFORMSTYLE, methods)
  let getThemeP = prop(GETTHEMEP, methods)

  return function transformStyleProp({postFn, getter, key, path, ...rest}) {
    return function transformStyleP(props) {
      return transformStyle({
        path: key || path,
        postFn: getter || postFn,
        lookUpfn: props ? (v, props) => getThemeP(v)(props) : undefined,
        props,
        ...rest,
      })
    }
  }
}

createTransformStyleP[IDKEY] = ASSISTANTID

export default createTransformStyleP
