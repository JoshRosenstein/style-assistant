import matchBlockP from './matchBlockP'
import {IDKEY, ISSTANDALONEKEY} from '../constants'
import {ASSISTANTID} from './constants'

const createMatchBlockP = () => matchBlockP

createMatchBlockP[IDKEY] = ASSISTANTID
createMatchBlockP[ISSTANDALONEKEY] = true

export default createMatchBlockP
