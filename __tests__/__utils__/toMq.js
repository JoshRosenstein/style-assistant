import {createToMq} from '../../src/toMq'
import {pxTo} from '../../src/pxTo'
const pxToEm = pxTo(16)('em')
export default createToMq({pxToEm})
