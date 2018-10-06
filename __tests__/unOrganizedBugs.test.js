import Assistant from '../src/index'

it('[switchProp] transformerOptions passes to responsiveProp', () => {
  const defaultTheme = {
    breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },
    space: { none: 0, xxs: 2, xs: 4, sm: 8, md: 16, lg: 32, xl: 64, xxl: 128 }
  }

  const transformOptions = {
    functions: { identity: x => x, px: x => parseFloat(x) + 'px' }
  }

  const switchPropOptions = { transform: true }
  const { switchP: switchProp, pxToRem } = new Assistant({
    defaultTheme,
    switchPropOptions,
    transformOptions
  })

  ///Use switch props for alias prop Targets
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
  let o = {}
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

it('[responsiveProp] value of 0 should not to the default', () => {
  const defaultTheme = {
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
    fontSizesObj: { xs: 12, sm: 14, md: 16, lg: 20 },
    breakpoints: [640, 832, 1024]
  }

  const responsivePropOptions = { transform: true }
  const { responsiveProp } = new Assistant({
    defaultTheme,
    responsivePropOptions
  })
  const emptyProps = {}
  const withProps = { theme: { colors: { blue: 'myBlueColor' } } }
  const CSSPROP = 'CSSPROP'
  let o = {}

  o.themeLookup = responsiveProp({
    cssProp: CSSPROP,
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: v => v + 'px'
  })({ fontSize: 0 }) //=>"{fontSize": "14px"}

  // o.responsivethemeLookup = responsiveProp({
  //   cssProp: CSSPROP,
  //   key: 'fontSizes',
  //   prop: 'fontSize',
  //   postFn: v => v + 'px'
  // })({ fontSize: [1, 2] }) //=>{"fontSize": "14px","@media screen and (min-width:40em)": {"fontSize": "16px" }}

  expect(o.themeLookup).toEqual({ [CSSPROP]: '12px' })
})

it('[switchProp] SpaceProp', () => {
  const defaultTheme = {
    breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512]
  }

  const transformOptions = {
    functions: {
      identity: x => x,
      returnAsIs: x => x,
      px: x => parseFloat(x) + 'px'
    }
  }

  const switchPropOptions = { transform: true }
  const { switchP: switchProp, pxToRem } = new Assistant({
    defaultTheme,
    switchPropOptions,
    transformOptions
  })
  const num = n => typeof n === 'number' && !isNaN(n)
  const px = n => (num(n) ? n + 'px' : n)
  const merge = (a, b) =>
    Object.assign(
      {},
      a,
      b,
      Object.keys(b || {}).reduce(
        (obj, key) =>
          Object.assign(obj, {
            [key]:
              a[key] !== null && typeof a[key] === 'object'
                ? merge(a[key], b[key])
                : b[key]
          }),
        {}
      )
    )
  const compose = (...funcs) => {
    const fn = props =>
      funcs
        .map(fn => fn(props))
        .filter(Boolean)
        .reduce(merge, {})

    return fn
  }

  const padding = switchProp(
    {
      padding: 'returnAsIs',
      p: 'returnAsIs'
    },
    {
      cssProp: 'padding',
      key: 'space',
      postFn: px
    }
  )

  const paddingLeft = switchProp(
    {
      paddingLeft: 'returnAsIs',
      pl: 'returnAsIs',
      px: 'returnAsIs'
    },
    {
      cssProp: 'paddingLeft',
      key: 'space',
      postFn: px
    }
  )

  const paddingRight = switchProp(
    {
      paddingRight: 'returnAsIs',
      pr: 'returnAsIs',
      px: 'returnAsIs'
    },
    {
      cssProp: 'paddingRight',
      key: 'space',
      postFn: px
    }
  )

  const paddingTop = switchProp(
    {
      paddingTop: 'returnAsIs',
      pt: 'returnAsIs',
      py: 'returnAsIs'
    },
    {
      cssProp: 'paddingTop',
      key: 'space',
      postFn: px
    }
  )

  const paddingBottom = switchProp(
    {
      paddingBottom: 'returnAsIs',
      pb: 'returnAsIs',
      py: 'returnAsIs'
    },
    {
      cssProp: 'paddingBottom',
      key: 'space',
      postFn: px
    }
  )

  const margin = switchProp(
    {
      margin: 'returnAsIs',
      m: 'returnAsIs'
    },
    {
      cssProp: 'margin',
      key: 'space',
      postFn: px
    }
  )

  const marginLeft = switchProp(
    {
      marginLeft: 'returnAsIs',
      ml: 'returnAsIs',
      mx: 'returnAsIs'
    },
    {
      cssProp: 'marginLeft',
      key: 'space',
      postFn: px
    }
  )

  const marginRight = switchProp(
    {
      marginRight: 'returnAsIs',
      mr: 'returnAsIs',
      mx: 'returnAsIs'
    },
    {
      cssProp: 'marginRight',
      key: 'space',
      postFn: px
    }
  )

  const marginTop = switchProp(
    {
      marginTop: 'returnAsIs',
      mt: 'returnAsIs',
      my: 'returnAsIs'
    },
    {
      cssProp: 'marginTop',
      key: 'space',
      postFn: px
    }
  )

  const marginBottom = switchProp(
    {
      marginBottom: 'returnAsIs',
      mb: 'returnAsIs',
      my: 'returnAsIs'
    },
    {
      cssProp: 'marginBottom',
      key: 'space',
      postFn: px
    }
  )

  const space = compose(
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    margin,
    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
    padding
  )

  let o = {}
  const debugg = switchProp(
    {
      margin: 'returnAsIs',
      m: 'returnAsIs'
    },
    {
      cssProp: 'margin',
      key: 'space',
      postFn: px
    }
  )
  o.marginZero = margin({ margin: 0 })
  // o.responsivethemeLookup = responsiveProp({
  //   cssProp: CSSPROP,
  //   key: 'fontSizes',
  //   prop: 'fontSize',
  //   postFn: v => v + 'px'
  // })({ fontSize: [1, 2] }) //=>{"fontSize": "14px","@media screen and (min-width:40em)": {"fontSize": "16px" }}

  expect(o.marginZero).toEqual({ margin: '0px' })
})
