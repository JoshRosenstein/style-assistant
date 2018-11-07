// @flow

import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import {ASSISTANTID as PXTO} from '../pxTo/constants'
import getAndCheckMethod from '../shared/getAndCheckMethod'
import type {NormalizeT} from './types'

const getDeps = getAndCheckMethod(ASSISTANTID)

const createNormalize = (methods: {}): NormalizeT => {
  const pxToRelative = getDeps(PXTO, methods)()
  return (unit: '') => (value, base) =>
    parseFloat(pxToRelative(value)) / parseFloat(pxToRelative(base)) + unit
}

createNormalize[IDKEY] = ASSISTANTID

export default createNormalize
