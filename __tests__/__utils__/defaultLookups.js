import {identity} from '@roseys/futils'
import {appendUnit} from '../../src/utils'
import PxTo from '../../src/PxTo/PxTo'
const pxToRem = v => PxTo(16)('rem')(v)
const pxToEm = v => PxTo(16)('em')(v)
const pxToPct = v => PxTo(16 / 100)('%')(v)
const px = v => PxTo(1)('px')(v)
const ms = appendUnit('ms')
const pct = appendUnit('%')

export default {
  keys: {
    margin: 'space',
    marginTop: 'space',
    marginBottom: 'space',
    marginLeft: 'space',
    marginRight: 'space',
    padding: 'space',
    paddingTop: 'space',
    paddingBottom: 'space',
    paddingLeft: 'space',
    paddingRight: 'space',
    color: 'colors',
    fontSize: 'fontSizes',
    fontFamily: 'fonts',
    lineHeight: 'lineHeights',
    fontWeight: 'fontWeights',
    letterspace: 'letterspaces',
    maxWidth: 'maxWidths',
    minWidths: 'minWidths',
    height: 'heights',
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    border: 'borders',
    borderColor: 'colors',
    backgroundColor: 'colors',
    boxShadow: 'shadows',
  },
  getter: {
    margin: 'pxToRem',
    marginTop: 'pxToRem',
    marginBottom: 'pxToRem',
    marginLeft: 'pxToRem',
    marginRight: 'pxToRem',
    padding: 'pxToRem',
    paddingTop: 'pxToRem',
    paddingBottom: 'pxToRem',
    paddingLeft: 'pxToRem',
    paddingRight: 'pxToRem',
    fontSize: 'px',
  },
  functions: {
    returnAsIs: identity,
    identity,
    propValue: identity,
    self: identity,
    pxToRem,
    pxToEm,
    pxToPct,
    px,
    ms,
    pct,
    '%': pct,
  },
}
