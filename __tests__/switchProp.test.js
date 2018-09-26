import Assistant from '../src/index'
import testTheme from './__utils__/testThemeObj'

const styler = new Assistant({ defaultTheme: testTheme, alwaysTransform: true })

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('switch Props Uses default key', () => {
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
        responsive: true
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

  // TODO: responsive Bool Enabled returns empty
  it('switchProps you can reference other props', () => {
    const e = styler.switchProp(
      {
        height: (heightPropValue, { heightScaleFactor }) =>
          heightScaleFactor
            ? heightPropValue * heightScaleFactor
            : heightPropValue,
        default: 'defaultValue'
      },
      {
        cssProp: 'height'
        //  key: 'space',
        // responsive: true,
        //  responsiveBool: true
      }
    )({ height: 2, heightScaleFactor: 2 })
    const r = { height: 4 }

    expect(e).toEqual(r)
  })

  it('switchProp uses ComputeOptions', () => {
    const e = styler.switchProp(
      {
        height: v => v
      },
      {
        cssProp: 'height',
        key: 'space',
        postFn: styler.pxToRem

        //  key: 'space',
        // responsive: true,
        //  responsiveBool: true
      }
    )({ height: 'sm' })
    const r = { height: '0.5rem' }

    expect(e).toEqual(r)
  })
})
