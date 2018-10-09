
import {
    mergeAllDeepRight,
    flow,
    when,
    map,
    isNumber,
    ifElse,
    either,lt,
    complement,
    whenFunctionCallWith,
    identity,
    prop,
    compact
  } from '@roseys/futils'
  import Assistant from '../../src/index'
  
  const isNotNumber = complement(isNumber)
  export const compose = (...funcs) => {
    const fn = props =>
      flow(
        funcs,
        map(whenFunctionCallWith(props)),
        compact,
        mergeAllDeepRight
      )
  
    return fn
  }
  
  export const px = when(isNumber, num => `${num  }px`)
  
  const css = props => props.css
  const themed = key => props => prop(key,prop('theme',props))
  
  const defaultLookups = {
    keys: {
      // / Default themeKey to use id matching cssProp is found within transformStyle
      // margin: "space",
      // marginTop: "space",
      // marginBottom: "space",
      // marginLeft: "space",
      // marginRight: "space",
      // padding: "space",
      // paddingTop: "space",
      // paddingBottom: "space",
      // paddingLeft: "space",
      // paddingRight: "space",
      // color: "colors",
      // fontSize: "fontSizes",
      // fontFamily: "fonts",
      // lineHeight: "lineHeights",
      // fontWeight: "fontWeights",
      // letterspace: "letterspaces",
      // maxWidth: "maxWidths",
      // minWidths: "minWidths",
      // height: "heights",
      // gridGap: "space",
      // gridColumnGap: "space",
      // gridRowGap: "space",
      // border: "borders",
      // borderColor: "colors",
      // backgroundColor: "colors",
      // boxShadow: "shadows"
    },
    getter: {
      // / Default getter to use id matching cssProp is found within transformStyle, can be string to match functions below or function
      // margin: "pxToRem",
      // marginTop: "pxToRem",
      // marginBottom: "pxToRem",
      // marginLeft: "pxToRem",
      // marginRight: "pxToRem",
      // padding: "pxToRem",
      // paddingTop: "pxToRem",
      // paddingBottom: "pxToRem",
      // paddingLeft: "pxToRem",
      // paddingRight: "pxToRem",
      // fontSize: "px"
    },
    functions: {
      // Shorthand lookup functions. used in switchP. If value is a string of one of the keys below, then will call corresponding function with corresponding prop value
      identity,
      returnAsIs: identity, // Can add aliases
      propValue: identity, // alias
      self: identity, // alias
      px,
      ms: x => `${parseFloat(x)  }ms`,
      pct: x => {
        x = parseFloat(x)
        x = Math.abs(x) < 1 ? x * 100 : x
        return `${x  }%`
      }
    }
  }
  const defaultTheme = {
    // breakpoints: [640, 832, 1024],
  
    breakpoints: {
      tablet: 640,
      laptop: 832,
      desktop: 1024
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    // space: {
    //   none: 0,
    //   xxs: 2,
    //   xs: 4,
    //   sm: 8,
    //   md: 16,
    //   lg: 32,
    //   xl: 64,
    //   xxl: 128
    // },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
    // fontSizes: {
    //   xs: 12,
    //   sm: 14,
    //   md: 16,
    //   lg: 20,
    //   xl: 24,
    //   xxl: 32,
    //   xxxl: 48
    // },
    lineHeights: [1, 1.125, 1.25, 1.5],
    fontWeights: {
      normal: 500,
      bold: 'bold'
    },
    letterSpacings: {
      normal: 'normal',
      caps: '0.25em'
    },
    radii: [0, 2, 4, 8],
    borders: [0, '1px solid', '2px solid'],
    shadows: {
      small: '0 0 4px rgba(0, 0, 0, .125)',
      large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    colors: {
      blue: 'blue',
      lightgray: '#f6f6ff'
    }
  }
  
  export const config={
    defaultTheme,
    baseFontSize: 16, // / Unitless value used for unit conversions Utils
    themeKey: 'theme', // / Unitless value used for unit conversions Utils
    breakpointsKey: 'breakpoints',
    alwaysTransform: true,
    transformOptions: {
      defaultLookup: true,
      defaultTransform: true,
      keys: defaultLookups.keys,
      getter: defaultLookups.getter,
      functions: defaultLookups.functions
    },
    responsivePOptions: {
      transform: true
    },
    switchPOptions: {
      transform: true,
      responsive:true
    },
    parserOptions: {
      transform: true
    }
  }
  
  
  export const {
    responsiveP, // using alias to match styled-system
    switchP,
  } = new Assistant(config)
  
  export const getWidth = ifElse(
    either(isNotNumber, lt(1)),
    px,
    decimal => `${decimal * 100  }%`
  )
  // export const getWidth = n => (!isNumber(n) || n > 1 ? px(n) : n * 100 + "%");
  export const width = responsiveP({
    prop: 'width',
    postFn: getWidth
  })
  
  export const fontSize = responsiveP({
    cssProp: 'fontSize',
    key: 'fontSizes',
    prop: 'fontSize',
    postFn: px
  })
  
  // flexbox
  export const alignItems = responsiveP({
    prop: 'alignItems'
  })
  
  export const alignContent = responsiveP({
    prop: 'alignContent'
  })
  
  export const justifyItems = responsiveP({
    prop: 'justifyItems'
  })
  
  export const justifyContent = responsiveP({
    prop: 'justifyContent'
  })
  
  export const flexWrap = responsiveP({
    prop: 'flexWrap'
  })
  
  export const flexBasis = responsiveP({
    prop: 'flexBasis',
    postFn: getWidth
  })
  
  export const flexDirection = responsiveP({
    prop: 'flexDirection'
  })
  
  export const flex = responsiveP({
    prop: 'flex'
  })
  
  export const justifySelf = responsiveP({
    prop: 'justifySelf'
  })
  
  export const alignSelf = responsiveP({
    prop: 'alignSelf'
  })
  
  export const order = responsiveP({
    prop: 'order'
  })
  
  export const textColor = responsiveP({
    prop: 'color',
    key: 'colors'
  })
  
  export const bgColor = responsiveP({
    prop: 'bg',
    cssProp: 'backgroundColor',
    key: 'colors'
  })
  
  export const color = compose(
    textColor,
    bgColor
  )
  
  export const padding = switchP(
    {
      padding: 'returnAsIs',
      p: 'returnAsIs'
    },
    {
      cssProp: 'padding',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const paddingLeft = switchP(
    {
      paddingLeft: 'returnAsIs',
      pl: 'returnAsIs',
      px: 'returnAsIs'
    },
    {
      cssProp: 'paddingLeft',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const paddingRight = switchP(
    {
      paddingRight: 'returnAsIs',
      pr: 'returnAsIs',
      px: 'returnAsIs'
    },
    {
      cssProp: 'paddingRight',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const paddingTop = switchP(
    {
      paddingTop: 'returnAsIs',
      pt: 'returnAsIs',
      py: 'returnAsIs'
    },
    {
      cssProp: 'paddingTop',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const paddingBottom = switchP(
    {
      paddingBottom: 'returnAsIs',
      pb: 'returnAsIs',
      py: 'returnAsIs'
    },
    {
      cssProp: 'paddingBottom',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const margin = switchP(
    {
      margin: 'returnAsIs',
      m: 'returnAsIs'
    },
    {
      cssProp: 'margin',
      key: 'sizing',
      postFn: px,
  
    }
  )
  
  export const marginLeft = switchP(
    {
      marginLeft: 'returnAsIs',
      ml: 'returnAsIs',
      mx: 'returnAsIs'
    },
    {
      cssProp: 'marginLeft',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const marginRight = switchP(
    {
      marginRight: 'returnAsIs',
      mr: 'returnAsIs',
      mx: 'returnAsIs'
    },
    {
      cssProp: 'marginRight',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const marginTop = switchP(
    {
      marginTop: 'returnAsIs',
      mt: 'returnAsIs',
      my: 'returnAsIs'
    },
    {
      cssProp: 'marginTop',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const marginBottom = switchP(
    {
      marginBottom: 'returnAsIs',
      mb: 'returnAsIs',
      my: 'returnAsIs'
    },
    {
      cssProp: 'marginBottom',
      key: 'sizing',
      postFn: px
    }
  )
  
  export const space = compose(
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
  
  export const Box = compose(
    space,
    width,
    fontSize,
    color,
    flex,
    order,
    alignSelf,
    justifySelf,
    themed('Box'),
    css
  )
  
  export const Flex = compose(
    {
      display: 'flex'
    },
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
  
    themed('Flex')
  )
  