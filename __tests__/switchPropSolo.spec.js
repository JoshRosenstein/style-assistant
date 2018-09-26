import switchProp from './__utils__/switchProp'

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('switch Props Uses default key', () => {
    const e = switchProp(
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
    const e = switchProp(
      {
        primary: 'primary',
        secondary: v => v,
        default: 'defaultValue'
      },
      {
        cssProp: 'marginTop',
        transform: false,
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
    const e = switchProp(
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
    const e = switchProp(
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
    const e = switchProp(
      {
        height: v => v
      },
      {
        cssProp: 'height',
        key: 'space',
        postFn: v => `${v / 16  }rem`

        //  key: 'space',
        // responsive: true,
        //  responsiveBool: true
      }
    )({ height: 'sm' })
    const r = { height: '0.5rem' }

    expect(e).toEqual(r)
  })
})
