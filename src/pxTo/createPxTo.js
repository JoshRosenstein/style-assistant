//@flow
import type {pxToT} from './types'
import {IDKEY, ISSTANDALONEKEY} from '../constants'
import {ASSISTANTID} from './constants'
import pxTo from './pxTo'

type PxToT = (options: {baseFontSize: number}) => pxToT

const createPxTo: PxToT = ({baseFontSize}): pxToT => pxTo(baseFontSize)
createPxTo[IDKEY] = ASSISTANTID
createPxTo[ISSTANDALONEKEY] = true
export default createPxTo
