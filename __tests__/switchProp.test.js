import Assistant from '../src/index'

import testTheme from './__utils__/testThemeArr'

const styler = new Assistant({ defaultTheme: testTheme })

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('switch Props with responsiveProp ', () => {
    const e = styler.switchProp(
      {
        primary: 'primary',
        secondary: v => v,
        default: 'defaultValue'
      },
      { cssProp: 'key' }
    )({ primary: null, secondary: null })

    const r = { key: 'defaultValue' }

    expect(e).toEqual(r)
  })

  it('switch Props with responsiveProp ', () => {
    const e = styler.switchProp(
      {
        primary: 'primary',
        secondary: v => v,
        default: 'defaultValue'
      },
      {
        cssProp: 'marginTop',
        key: 'space',
        responsive: true,
        responsiveBool: true
      }
    )({ primary: null, secondary: [1, 2] })

    const r = {
      '@media screen and (min-width:1BP_Test)': { marginTop: 2 },
      marginTop: 1
    }

    expect(e).toEqual(r)
  })

  it('switch Props with responsiveBoolProp ', () => {
    const e = styler.switchProp(
      {
        primary: 'primary',
        secondary: v => v,
        default: 'defaultValue'
      },
      {
        cssProp: 'marginTop',
        key: 'space',
        // responsive: true,
        responsiveBool: true
      }
    )({ secondary: null, primary: [true, true] })
    const r = {
      '@media screen and (min-width:1BP_Test)': { marginTop: 'primary' },
      marginTop: 'primary'
    }

    expect(e).toEqual(r)
  })
})
