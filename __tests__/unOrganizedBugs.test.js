import Assistant from '../src/index'

it('t',()=>{

  const defaultTheme = {
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
    fontSizesObj: { xs: 12, sm: 14, md: 16, lg: 20 },
    breakpoints: [640, 832, 1024],
  }
  
  const responsivePOptions = { transform: true }
  const { responsiveP } = new Assistant({ defaultTheme, responsivePOptions })
  
  const o = {}
  o.basic = responsiveP({
    cssProp: 'fontSize',
    prop: 'fontSize',
  })({ fontSize: '2px' }) 
  
  o.themeLookup = responsiveP({
    cssProp: 'fontSize',
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: v => `${v  }px`,
  })({ fontSize: 1 }) 
  
  o.responsivethemeLookup = responsiveP({
    cssProp: 'fontSize',
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: v => `${v  }px`,
  })({ fontSize: [1, 2] }) 
  
  o.usingBuiltInTransformation = responsiveP({
    cssProp: 'fontSize',
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: 'pxToRem',
  })({ fontSize: [1, 2] }) 
  
  o.usingObjectStyleTheme = responsiveP({
    cssProp: 'fontSize',
    key: 'fontSizesObj',
    prop: 'fontSize',
    postFn: v => `${v  }px`,
  })({ fontSize: ['sm', 'md'] })

  expect(o).toEqual({'basic': {'fontSize': '2px'}, 'responsivethemeLookup': {'@media screen and (min-width:40em)': {'fontSize': '16px'}, 'fontSize': '14px'}, 'themeLookup': {'fontSize': '14px'}, 'usingBuiltInTransformation': {'@media screen and (min-width:40em)': {'fontSize': '1rem'}, 'fontSize': '0.875rem'}, 'usingObjectStyleTheme': {'@media screen and (min-width:40em)': {'fontSize': '16px'}, 'fontSize': '14px'}})
})

it('[switchProp] transformerOptions passes to responsiveP', () => {
  const defaultTheme = {
    breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },
    space: { none: 0, xxs: 2, xs: 4, sm: 8, md: 16, lg: 32, xl: 64, xxl: 128 }
  }

  const transformOptions = {
    functions: { identity: x => x, px: x => `${parseFloat(x)}px` }
  }

  const switchPropOptions = { transform: true }
  const { switchP: switchProp, pxToRem } = new Assistant({
    defaultTheme,
    switchPropOptions,
    transformOptions
  })

  // /Use switch props for alias prop Targets
  const padding = switchProp(
    {
      padding: 'identity' ,
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

it('[responsiveP] value of 0 should not to the default', () => {
  const defaultTheme = {
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
    fontSizesObj: { xs: 12, sm: 14, md: 16, lg: 20 },
    breakpoints: [640, 832, 1024]
  }

  const responsivePOptions = { transform: true }
  const { responsiveP } = new Assistant({
    defaultTheme,
    responsivePOptions
  })

  const CSSPROP = 'CSSPROP'
  const o = {}

  o.themeLookup = responsiveP({
    cssProp: CSSPROP,
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: v => `${v}px`
  })({ fontSize: 0 }) //= >"{fontSize": "14px"}

  // o.responsivethemeLookup = responsiveP({
  //   cssProp: CSSPROP,
  //   key: 'fontSizes',
  //   prop: 'fontSize',
  //   postFn: v => v + 'px'
  // })({ fontSize: [1, 2] }) //=>{"fontSize": "14px","@media screen and (min-width:40em)": {"fontSize": "16px" }}

  expect(o.themeLookup).toEqual({ [CSSPROP]: '12px' })
})

