import {createToMq} from '../../src/toMq'
import pxToC from '../../src/PxTo/PxTo'

const pxToEm = pxToC(16)('em')
export default createToMq({pxToEm})
