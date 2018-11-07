// @flow

import {IDKEY} from '../constants'
import {ASSISTANTID} from './constants'
import {ASSISTANTID as PXTO} from '../pxTo/constants'
import getAndCheckMethod from '../shared/getAndCheckMethod'
import type {PxToRelativeT} from './types'
const getDeps = getAndCheckMethod(ASSISTANTID)
const createPxToRelative = (methods: {}): PxToRelativeT => {
  const pxTo = getDeps(PXTO, methods)
  return pxTo()
}

createPxToRelative[IDKEY] = ASSISTANTID

export default createPxToRelative
