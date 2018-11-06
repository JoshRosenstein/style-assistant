import Assistant from '../src/index'

import testTheme from './__utils__/testThemeArr'

const styler = new Assistant({defaultTheme: testTheme})

describe('Quick Helpers', () => {
  it('Any raw Unitless Number assumes to be px ', () => {
    const {
      pxToEm,
      pxToRem,
      normalize,
      normalizeToEm,
      normalizeToRem,
      pxToPct,
      pxToRelative,
    } = styler
    expect(pxToEm(16)).toEqual('1em')
    expect(pxToRem(16)).toEqual('1rem')
    expect(pxToPct(16)).toEqual('100%')
    expect(pxToRelative(16)).toEqual(1)

    expect(normalize('em')(16, 16)).toEqual('1em')

    expect(normalizeToEm(16, 16)).toEqual('1em')
    expect(normalizeToEm(pxToEm(16), '1em')).toEqual('1em')
    expect(normalizeToEm(pxToEm(8), '1em')).toEqual('0.5em')
    expect(normalizeToEm(8, '1em')).toEqual('0.5em')

    expect(normalizeToRem(16, 16)).toEqual('1rem')
    expect(normalizeToRem(pxToRem(16), '1em')).toEqual('1rem')
    expect(normalizeToRem(pxToRem(8), '1em')).toEqual('0.5rem')
    expect(normalizeToRem(8, '1em')).toEqual('0.5rem')
  })

  it('toMq Helper', () => {
    const {toMq} = styler

    expect(toMq({screen: true, min: 1500})).toEqual(
      '@media screen and (min-width:93.75em)',
    )

    expect(toMq({max: 1500, min: 1200})).toEqual(
      '@media (max-width:93.75em) and (min-width:75em)',
    )

    expect(
      toMq({screen: true, orientation: 'landscape', 'min-device-width': 639}),
    ).toEqual(
      '@media screen and (orientation:landscape) and (min-device-width:39.938em)',
    )
  })
  // it('Updating Theme wiht deep merge', () => {
  //   const { getTheme } = styler

  //   expect(getTheme('colors.black')).toEqual('#000')
  //   styler.mergeDefaultTheme({ colors: { customColor: 'MycustomColor' } })
  //   expect(getDefaultTheme('colors.customColor')).toEqual('MycustomColor')
  // })

  it('defaultTheme Getter', () => {
    //   const { getTheme } = styler

    expect(styler.defaultTheme.colors.black).toEqual('#000')
    //  styler.mergeDefaultTheme({ colors: { customColor: 'MycustomColor' } })
    //  expect(getDefaultTheme('colors.customColor')).toEqual('MycustomColor')
  })

  it('GetThemeP', () => {
    const {getThemeP} = styler

    expect(getThemeP('colors.black')({})).toEqual('#000')

    expect(
      getThemeP('customColors.black')({
        theme: {customColors: {black: 'customBlack'}},
      }),
    ).toEqual('customBlack')
  })

  it('GetTheme', () => {
    const {getTheme} = styler

    expect(getTheme('colors.black')).toEqual('#000')

    expect(getTheme('customColors.black')).toEqual(undefined)
  })
})
