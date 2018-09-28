import Assistant from '../src/index'

it('[switchProp] transformerOptions passes to responsiveProp', () => {
  const defaultTheme = {
    breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },
    space: { none: 0, xxs: 2, xs: 4, sm: 8, md: 16, lg: 32, xl: 64, xxl: 128 }
  }

  const transformOptions = {
    functions: { identity: x => x, px: x => `${parseFloat(x)  }px` }
  }

  const switchPropOptions = { transform: true }
  const { switchProp, pxToRem } = new Assistant({
    defaultTheme,
    switchPropOptions,
    transformOptions
  })

  // /Use switch props for alias prop Targets
  const padding = switchProp(
    {
      padding: 'identity',
      p: 'identity',
      default: '.25rem'
    },
    {
      cssProp: 'padding',
      key: 'space',
      postFn: pxToRem,
      responsive: true
    }
  )
  const o = {}
  o.basic = padding({ p: '16px' })
  o.basic2 = padding({ padding: 8 })
  o.orderMatters = padding({ p: 8, padding: '16px' })
  o.UsesDefault = padding({})
  o.responsive = padding({ p: [16, 8] })
  o.responsiveWithObj = padding({ p: { desktop: 8 } })
  o.looksUpSpaceTheme = padding({ p: 'sm' })
  o.responsiveThemeLookup = padding({ p: ['sm', 'md', 'lg'] })

  expect(o.basic).toEqual({ padding: '1rem' })
  expect(o.basic2).toEqual({ padding: '0.5rem' })
  expect(o.orderMatters).toEqual({ padding: '1rem' })
  expect(o.UsesDefault).toEqual({ padding: '.25rem' })
  expect(o.responsive).toEqual({
    '@media screen and (min-width:40em)': { padding: '0.5rem' },
    padding: '1rem'
  })
  expect(o.responsiveWithObj).toEqual({
    '@media screen and (min-width:64em)': { padding: '0.5rem' }
  })
  expect(o.looksUpSpaceTheme).toEqual({ padding: '0.5rem' })
  expect(o.responsiveThemeLookup).toEqual({
    '@media screen and (min-width:40em)': { padding: '1rem' },
    '@media screen and (min-width:52em)': { padding: '2rem' },
    padding: '0.5rem'
  })
})
