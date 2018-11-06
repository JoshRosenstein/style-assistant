import Assistant from '../src/index'
import config from './__utils__/testDefaultConfig'

const styler = new Assistant(config)

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('Works ', () => {
    //  log.getLogger('transformStyle').setLevel(0)
    const e = styler.transformStyle({
      value: 'sm',
      cssProp: 'margin',
      options: {
        key: 'space',
      },
    })

    const r = {margin: '0.5rem'}
    // log.getLogger('transformStyle').setLevel(3)
    expect(e).toEqual(r)
  })

  it('References Getter Dictionary ', () => {
    const e = styler.transformStyle({
      cssProp: 'marginTop',
      value: 16,
      options: {
        key: 'space',
        getter: 'pxToRem',
        defaultLookup: false,
        defaultTransform: false,
      },
    })
    const r = {marginTop: '1rem'}

    expect(e).toEqual(r)
  })
})
