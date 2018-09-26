import Assistant from '../src/index'

import testTheme from './__utils__/testThemeArr'

const styler = new Assistant({ defaultTheme: testTheme })

describe('Quick Helpers', () => {
  it('Any raw Unitless Number assumes to be px ', () => {
    const { pxToEm, normalizeToEm } = styler
    expect(pxToEm(16)).toEqual('1em')
    expect(normalizeToEm(16, 16)).toEqual('1em')
    expect(normalizeToEm(pxToEm(16), '1em')).toEqual('1em')
    expect(normalizeToEm(pxToEm(8), '1em')).toEqual('0.5em')
    expect(normalizeToEm(8, '1em')).toEqual('0.5em')
  })

  it('toMq Helper', () => {
    const { toMq } = styler

    expect(toMq({ screen: true, min: 1500 })).toEqual(
      '@media screen and (min-width:93.75em)'
    )

    expect(toMq({ max: 1500, min: 1200 })).toEqual(
      '@media (max-width:93.75em) and (min-width:75em)'
    )

    expect(
      toMq({ screen: true, orientation: 'landscape', 'min-device-width': 639 })
    ).toEqual(
      '@media screen and (orientation:landscape) and (min-device-width:39.938em)'
    )
  })
  it('Updating Theme wiht deep merge', () => {
    const { getDefaultTheme } = styler

    expect(getDefaultTheme('colors.black')).toEqual('#000')
    styler.mergeDefaultTheme({ colors: { customColor: 'MycustomColor' } })
    expect(getDefaultTheme('colors.customColor')).toEqual('MycustomColor')
  }),
  it('GetTheme', () => {
    const { getTheme } = styler

    expect(getTheme('colors.black')({})).toEqual('#000')

    expect(
      getTheme('customColors.black')({
        theme: { customColors: { black: 'customBlack' } }
      })
    ).toEqual('customBlack')
  })
})