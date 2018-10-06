import Assistant from '../src/index'
import testTheme from './__utils__/testThemeObj'

describe('media', () => {
  const baseFontSize = 16
  const breakpoints = {
    mobile: 599,
    tablet: 768,
    desktop: 1200,
    hd: 1800
  }
  const { media } = new Assistant({
    baseFontSize,
    defaultTheme: {
      breakpoints
    }
  })
  test('Basic', () => {
    expect(media.hd({ a: 1 })).toEqual({
      [`@media screen and (min-width:${breakpoints.hd / baseFontSize}em)`]: {
        a: 1
      }
    })
  })
  test('Can Overide toMq', () => {
    expect(media.hd({ a: 1 }, v => ({ min: v - 1000 }))).toEqual({
      [`@media (min-width:${(breakpoints.hd - 1000) / baseFontSize}em)`]: {
        a: 1
      }
    })
    // console.log(styler.media.hd({ a: 1 }))
    // console.log(styler.media.hd({ a: 1 }, v => ({ min: v-1000 })))
  })

  test('Returns Empty if noStyles', () => {
    expect(media.hd({}, v => ({ min: v - 1000 }))).toEqual({})
    expect(media.hd(null)).toEqual({})
    // console.log(styler.media.hd({ a: 1 }))
    // console.log(styler.media.hd({ a: 1 }, v => ({ min: v-1000 })))
  })
})
