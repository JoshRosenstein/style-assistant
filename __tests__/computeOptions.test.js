import Assistant from '../src/index'

import testTheme from './__utils__/testThemeArr'

const styler = new Assistant({ defaultTheme: testTheme })

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('Works ', () => {
    const e = styler.computeOptions({
      val: 16,
      options: {
        key: 'space',
        getter: 'pxToRem',
        defaultLookup: false,
        defaultTransform: false
      },
      selector: 'marginTop'
    })({})
    const r = '1rem'

    expect(e).toEqual(r)
  })
})
