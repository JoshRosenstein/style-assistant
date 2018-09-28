#  style-assistant

style-assistant WIP

[![Build Status](https://travis-ci.org/JoshRosenstein/style-assistant.svg?branch=master)](https://travis-ci.org/JoshRosenstein/style-assistant)
[![npm](https://img.shields.io/npm/dm/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)
[![npm](https://img.shields.io/npm/v/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)
[![codecov](https://codecov.io/gh/JoshRosenstein/style-assistant/branch/master/graph/badge.svg)](https://codecov.io/gh/JoshRosenstein/styler)
![core gzip size](http://img.badgesize.io/https://unpkg.com/style-assistant?compression=gzip&label=core%20gzip%20size)
![core size](http://img.badgesize.io/https://unpkg.com/style-assistant?label=core%20size)

---
### Table of Contents

* [Installation](#installation)
*  [Examples](#examples)
* [Usage](#usage)
  * [Config](#config)
  * [Function Dependecies](#function-dependecies)
  * [pxTo](#pxto)
  * [pxToEm](#pxtoem)
  * [pxToRem](#pxtorem)
  * [pxToPct](#pxtopct)
  * [pxToRelative](#pxtorelative)
  * [normalize](#normalize)
  * [normalizeToEm](#normalizetoem)
  * [normalizeToRem](#normalizetorem)
  * [toMq](#tomq)
  * [getTheme](#gettheme)
  * [transformStyle](#transformstyle)
  * [responsiveProp](#responsiveprop)
  * [responsiveBoolProp](#responsiveboolprop)
  * [switchProp](#switchprop)
  * [parser](#parser)
* [Contributing](#contributing)
* [License](#license)

>## Quick Start

```
npm install --save style-assistant
```
```javascript
import Assistant from 'style-assistant'
const myAssistant= new Assistant({})
```

or

```
npm install --save style-assistant
```
## Examples
| Link                                                                                                                                                         | Description                                                                          | Tools Used                                                    |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------------------------|
| [![Edit recreating styled-system-Rebass with style-assistant ](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/92w80j9ky4) | This Example shows how you can recreate styled-system and rebass with responsiveProp | [responsiveProp](#responsiveprop) & [switchProp](#switchprop) |
| [![Edit nr15m67qzp](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nr15m67qzp?view=preview)                               | **WIP**- demos for API usage below                                                     | ALL                                                           |

## Usage



Usage Here

```javascript
import Assistant from 'style-assistant'
const config={}
const styler= new Assistant(config)
//OR
const {
  pxToRem,
  pxToEm,
  pxToPct,
  pxToRelative,
  normalize,
  normalizeToEm,
  normalizeToRem,
  toMq,
  parse,
  getDefaultTheme,
  mergeDefaultTheme,
  getTheme,
  getThemeWithFallbackKey,
  getThemeOr,
  responsiveProp,
  responsiveBoolProp,
  switchProp,
  transformStyle,
}= new Assistant(config)
```
### Config
config descriptions


| Key                   | Default Value                                                                                           | Description                                                                              | Used in                                                                                  |
|-----------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| defaultTheme          | {}                                                                                                      | defaultTheme is a fallback object if a theme or theme value is not provided within props | [getTheme](#gettheme)                                                                    |
| baseFontSize          | 16                                                                                                      | Used for unit conversion utils                                                           |  [pxTo](#pxto)                                                                           |
| themeKey              | 'theme'                                                                                                 | Although 'theme' is the norm, some other libraries pass theme as '$theme'                |  [getTheme](#gettheme)                                                                                  |
| breakpointsKey        | 'breakpoints'                                                                                           | This is used for responsive utils and toMq util                                          |   [responsiveProp](#responsiveprop),[responsiveBoolProp](#responsiveboolprop)            |
| transformOptions      | {defaultLookup: false,     defaultTransform: false,     keys: {},     getter: {},     functions: {`pxToRem`,`pxToEm`,`pxToPct`}   } | Set Global options for the transformStyle util               |    [transformStyle](#transformstyle)                                                                                       |
| responsivePropOptions | {transform: false}                                                                                      | Set Global options for responsivePropOptions                                             |    [responsiveProp](#responsiveprop)                                                                                      |
| switchPropOptions     | {transform: false}                                                                                      | Set Global options for switchPropOptions                                                 |        [switchProp](#switchprop)                                                                                  |
| parserOptions     | {transform: false}                                                                                      | Set Global options for parserOptions                                                 |       [parser](#parser)                                                                                |

```javascript
import Assistant from 'style-assistant'
import defaultTheme from './theme'
import defaultLookups from './defaultLookups'

const config = {
  defaultTheme,
  baseFontSize: 16, /// Unitless value used for unit conversions Utils
  themeKey: 'theme', /// Unitless value used for unit conversions Utils
  breakpointsKey: 'breakpoints',
  transformOptions: {
    defaultLookup: true,
    defaultTransform: true,
    keys: defaultLookups.keys,
    getter: defaultLookups.getter,
    functions: defaultLookups.functions,
  },
  responsivePropOptions: {
    transform: false,
  },
  switchPropOptions: {
    transform: false,
  },
    parserOptions: {
    transform: false
  }
}

export default new Assistant(config)


```

**Example**
Theme
```javascript
/// Any theme attribute can be an value, array or object
export default {
 // breakpoints:[640,832,1024],
  breakpoints: {
    tablet: 640,
    laptop: 832,
    desktop: 1024
  },
  //space:[0,2,4,8,16,32,64,128],
  space: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
    xxl: 128
  },
  //fontSizes:[12,14,16,20,24,32,48,64,72],
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48
  },
  colors: {
    red: "#f5222d",
  }
};

```
defaultLookUps
```javascript
const identity = x => x

/// Any theme attribute can be an value, array or object
export default {
  keys: {
    /// Default themeKey to use id matching cssProp is found within transformStyle
    margin: 'space',
    marginTop: 'space',
    marginBottom: 'space',
    marginLeft: 'space',
    marginRight: 'space',
    padding: 'space',
    paddingTop: 'space',
    paddingBottom: 'space',
    paddingLeft: 'space',
    paddingRight: 'space',
    color: 'colors',
    fontSize: 'fontSizes',
    fontFamily: 'fonts',
    lineHeight: 'lineHeights',
    fontWeight: 'fontWeights',
    letterspace: 'letterspaces',
    maxWidth: 'maxWidths',
    minWidths: 'minWidths',
    height: 'heights',
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    border: 'borders',
    borderColor: 'colors',
    backgroundColor: 'colors',
    boxShadow: 'shadows',
  },
  getter: {
    /// Default getter to use id matching cssProp is found within transformStyle, can be string to match functions below or function
    margin: 'pxToRem',
    marginTop: 'pxToRem',
    marginBottom: 'pxToRem',
    marginLeft: 'pxToRem',
    marginRight: 'pxToRem',
    padding: 'pxToRem',
    paddingTop: 'pxToRem',
    paddingBottom: 'pxToRem',
    paddingLeft: 'pxToRem',
    paddingRight: 'pxToRem',
    fontSize: 'px',
  },
  functions: {
    // Shorthand lookup functions. used in switchProp. If value is a string of one of the keys below, then will call corresponding function with corresponding prop value
    identity,
    returnAsIs: identity, //Can add aliases
    propValue: identity, //alias
    self: identity, //alias
    px: x => parseFloat(x) + 'px',
    ms: x => parseFloat(x) + 'ms',
    pct: x => {
      x = parseFloat(x)
      x = Math.abs(x) < 1 ? x * 100 : x
      return x + '%'
    },
  },
}


```

### Function Dependecies

* [pxTo](#pxto)
  * **config.baseFontSize**
* [pxToEm](#pxtoem)
  * [pxTo](#pxto)
* [pxToRem](#pxtorem)
  * [pxTo](#pxto)
* [pxToPct](#pxtopct)
  * [pxTo](#pxto)
* [pxToPct](#pxtopct)
  * [pxTo](#pxto)
* [pxToRelative](#pxtorelative)
  * [pxTo](#pxto)
* [normalize](#normalize)
  * [pxTo](#pxto)
* [normalizeToEm](#normalizetoem)
  * [pxTo](#pxto)
* [normalizeToRem](#normalizetorem)
  * [pxTo](#pxto)
* [toMq](#tomq)
  * [pxToEm](#pxtoem)
* [getTheme](#gettheme)
  * **config.themeKey**
  * **config.defaultTheme**
* [transformStyle](#transformstyle)
  * [getTheme](#gettheme)
  * **config.transformOptions**
  * **config.alwaysTransform**
* [responsiveProp](#responsiveprop)
  * [getTheme](#gettheme)
  * **config.breakpointsKey**
  * [toMq](#tomq)
  * [transformStyle](#transformstyle)
  * **config.responsivePropOptions**
* [responsiveBoolProp](#responsiveboolprop)
  * [getTheme](#gettheme)
  * **config.breakpointsKey**
  * [toMq](#tomq)
  * [transformStyle](#transformstyle)
* [switchProp](#switchprop)
  * [responsiveProp](#responsiveprop)
  * [responsiveBoolProp](#responsiveboolprop)
  * [transformStyle](#transformstyle)
  * **config.transformOptions.functions**
  * **config.switchPropOptions**
* [parser](#parser)
  * [switchProp](#switchprop)
  * [responsiveProp](#responsiveprop)
  * [responsiveBoolProp](#responsiveboolprop)
  * [toMq](#tomq)



>### pxTo
>---
>**Deps:** | [config.baseFontSize.](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
 unit => pxNumber || pxString => converted
>[Description Here]



**Example**

```javascript
TODO...
```

>### pxToEm
>---
>**Deps:** | [pxTo](#pxto) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here]

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToEm(16) //=> '1em'
```

>### pxToRem
>---
>**Deps:** | [pxTo](#pxto) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here]

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToRem(16) //=> '1rem'
```

>### pxToPct
>---
>**Deps:** | [pxTo](#pxto) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here]

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToPct(16) //=> '1%'
```

>### pxToRelative
>---
>**Deps:** | [pxTo](#pxto) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here] Returns untiless relative number.

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToRelative(16) //=> 1
```

>### normalize
>---
>**Deps:** | [pxTo](#pxto) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here]

**Example**

```javascript
...TODO
```

>### normalizeToEm
>---
>**Deps:** | [normalize](#normalize) |
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>[Description Here]

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.normalizeToEm(16,'.5rem') //=> '2em'
const example2=styler.normalizeToEm(16, 8) //=> '2em'
```

>### normalizeToRem
>---
>**Deps:** | [normalize](#normalize) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>[Description Here]

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.normalizeToEm(16,'.5rem') //=> '2rem'
const example2=styler.normalizeToEm(16, 8) //=> '2rem'
```



>### getTheme
>---
>**Deps:** | [config.themeKey](#config) | [config.defaultTheme](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/getTheme)
>
>[Description Here]

**Example**

```javascript
const defaultTheme = { colors: { "red": "#f5222d" } }
const { getTheme } = new Assistant({ defaultTheme })
const emptyProps = {}
const withProps = { theme: { colors: { blue: 'myBlueColor' } } }

let o = {}
o.withEmptyProps = getTheme('colors')(emptyProps) //=>"red": "#f5222d"
o.withProps = getTheme('colors')(withProps) //=>"blue": "myBlueColor"
o.dotNotation = getTheme('colors.red')(emptyProps) //=>"#f5222d",
o.fallsBacktoDefaultTheme = getTheme('colors.red')(withProps) //=> "#f5222d"



```
>### toMq
>---
>**Deps:** | [pxToEm](#pxtoem) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/toMq)
>
>Used in responsive utilties. quick helper to convert object to media query string. Currently depends on the 'pxToEm' functions.

**Example**

```jsx
import React from 'react'
import styled from './styled'
import styler from './styler'

const StyledExample = () => {
  const Example = {
    color: 'red',
    [styler.toMq({ screen: true, min: 400 })]: { color: 'blue' },
  }
  //Example=>{"color":"red","@media screen and (min-width:25em)":{"color":"blue"}}
  const Component = styled('div')(Example)
  return (
    <div>
      <Component>{JSON.stringify(Example)}</Component>
    </div>
  )
}

```


>### transformStyle
>---
>**Deps:** | [getTheme](#gettheme) | [config.transformOptions](#config) | [config.alwaysTransform](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/transformStyle)
>
>[Description Here]

**Example**

```javascript
const identity = x => x
const transformOptions = {
  functions: {
    identity, /// usefull in long switchProp Blocks
    self: identity, //alias
    px: x => parseFloat(x) + 'px'
  },
}

const defaultTheme = { space: { none: 0, xxs: 2, xs: 4, sm: 8, md: 16, lg: 32, xl: 64, xxl: 128, } }

const { transformStyle } = new Assistant({ transformOptions, defaultTheme })
const emptyProps = {}
const withProps = { theme: { colors: { blue: 'myBlueColor' } } }
const exampleOptions = {
  key: 'space',
  getter: 'pxToRem',
}
//// *************************All below will result to {"marginTop": "1rem"}*******************************
let o = {}
o.Basic = transformStyle({ cssProp: 'marginTop', value: "1rem"})(emptyProps)

o.Converts = transformStyle({ cssProp: 'marginTop', value: 16, getter: 'pxToRem', })(emptyProps)

o.looksUpValue = transformStyle({ cssProp: 'marginTop', value: 'md', key: 'space', getter: 'pxToRem', })(emptyProps)

o.postFnOrGetter = transformStyle({ cssProp: 'marginTop', value: 'md', key: 'space', postFn: 'pxToRem', })(emptyProps)

/// preFn options runs the raw value before applying theme lookup or getter/postfn
o.preFn = transformStyle({ cssProp: 'marginTop', value: 8, key: 'space', postFn: 'pxToRem', preFn: v => v * 2 })(emptyProps)

```

>### responsiveProp
>---
>**Deps:** | [getTheme](#gettheme) | [toMq](#tomq) | [transformStyle](#transformstyle) | [config.breakpointsKey](#config) |
>
>**Live Example:**[Sandbox](https://nr15m67qzp.codesandbox.io/responsiveprop)
>
>[Description Here]

**Example**

```javascript
const defaultTheme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128] ,
  fontSizesObj: {xs:12,sm:14, md:16, lg:20} ,
  breakpoints: [640, 832, 1024]
}

const responsivePropOptions={transform:true}
const { responsiveProp,px } = new Assistant({ defaultTheme,responsivePropOptions })

let o = {}
o.basic=responsiveProp({
  cssProp: "fontSize",
  prop: "fontSize",
})({fontSize:'2px'})  //=>{"fontSize": "2px"}

o.themeLookup=responsiveProp({
  cssProp: "fontSize",
  key: "fontSizes",
  prop: "fontSize",
postFn:v=>v+'px',
})({fontSize:1}) //=>"{fontSize": "14px"}

o.responsivethemeLookup=responsiveProp({
  cssProp: "fontSize",
  key: "fontSizes",
  prop: "fontSize",
  postFn:v=>v+'px',
})({fontSize:[1,2]})//=>{"fontSize": "14px","@media screen and (min-width:40em)": {"fontSize": "16px" }}

o.usingBuiltInTransformation=responsiveProp({
  cssProp: "fontSize",
  key: "fontSizes",
  prop: "fontSize",
  postFn:'pxToRem',
})({fontSize:[1,2]})//=>{ "fontSize": "0.875rem", "@media screen and (min-width:40em)": { "fontSize": "1rem" } }

o.usingObjectStyleTheme=responsiveProp({
  cssProp: "fontSize",
  key: "fontSizesObj",
  prop: "fontSize",
 postFn:v=>v+'px',
})({fontSize:["sm",'md']})//=>{ "fontSize": "14px", "@media screen and (min-width:40em)": { "fontSize": "16px" } }
```

>### responsiveBoolProp
>---
>**Deps:** | [getTheme](#gettheme) | [toMq](#tomq) | [config.breakpointsKey](#config) |
>
>**Live Example:**[Sandbox](https://nr15m67qzp.codesandbox.io/responsiveboolprop)
>
>This function is useful if you have a css property with a static default value, and want to apply to certain breakpoints

**Example**

```javascript

const defaultTheme = {
  breakpoints: [640, 832, 1024]
}
const defaultTheme2 = {
  breakpoints: {'sm':640,'md':832, 'lg':1024}
}

const responsivePropOptions={transform:true}
const { responsiveBoolProp } = new Assistant({ defaultTheme,responsivePropOptions })
const { responsiveBoolProp:responsiveBoolProp2 } = new Assistant({ defaultTheme:defaultTheme2,responsivePropOptions })

const hidden=responsiveBoolProp({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: 'isHidden'
      })

const hidden2=responsiveBoolProp2({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: 'isHidden'
      })

let o = {}
o.basic=  hidden({isHidden:true})
//=>{ "display": "none" }

o.responsive=  hidden({isHidden:[true,false]})
//=>{ "display": "none", "@media screen and (min-width:40em)": { "display": "block" } }

o.basicObjBP=  hidden({isHidden:true})
//=>{ "display": "none" }

o.responsiveObjBP= hidden({isHidden:[true,false]})
//=>{ "display": "none", "@media screen and (min-width:40em)": { "display": "block" } }

o.responsiveObjBP2=hidden2({isHidden:{default:true,sm:false}})
//=>{ "display": "none", "@media screen and (min-width:40em)": { "display": "block" } }

```

>### switchProp
>---
>**Deps:** | [responsiveProp](#responsiveprop)| [responsiveBoolProp](#responsiveboolprop) | [transformStyle](#transformstyle) | [config.transformOptions.functions](#config) | [config.switchPropOptions](#config) |
>
>**Live Example:**[Sandbox](https://nr15m67qzp.codesandbox.io/switchprop)
>
>[Description Here] Useful SwitchStatement like style block.

**Basic Example**
```javascript
const defaultTheme = {
breakpoints: { tablet: 640, laptop: 832, desktop: 1024 },
space: { none: 0, xxs: 2, xs: 4, sm: 8, md: 16, lg: 32, xl: 64, xxl: 128 },
}

const transformOptions = { functions: { identity:x=>x, px: x => parseFloat(x) + 'px', }, }

const switchPropOptions={transform:true}
const { switchProp,pxToRem } = new Assistant({ defaultTheme,switchPropOptions,transformOptions })

///Use switch props for alias prop Targets
const padding = switchProp(
  {
    padding: "identity",
    p: "identity",
     default: '.25rem'
  },
  {
    cssProp: "padding",
    key: "space",
    postFn:pxToRem,
    responsive:true
  }
)

  let o = {}
  o.basic = padding({ p: '16px' })
  //=>{ "padding": "1rem" }

  o.basic2 = padding({ padding: 8 })
  //=>{ "padding": "0.5rem" }

  o.orderMatters = padding({ p: 8, padding: '16px' })
  //=>{ "padding": "1rem" }

  o.UsesDefault = padding({})
  //=>{ "padding": ".25rem" }

  o.responsive = padding({ p: [16, 8] })
  //=>{ "padding": "1rem", "@media screen and (min-width:40em)": { "padding": "0.5rem" } }

  o.responsiveWithObj = padding({ p: { desktop: 8 } })
  //=>{ "@media screen and (min-width:64em)": { "padding": "0.5rem" } }

  o.looksUpSpaceTheme = padding({ p: 'sm' })
  //=>{ "padding": "0.5rem" }

  o.responsiveThemeLookup = padding({ p: ['sm', 'md', 'lg'] })
  //=>{ "padding": "0.5rem", "@media screen and (min-width:40em)": { "padding": "1rem" }, "@media screen and (min-width:52em)": { "padding": "2rem" } }

```


>### parser
>---
>**Deps:** | [switchProp](#switchprop) | [responsiveProp](#responsiveprop) | [responsiveBoolProp](#responsiveboolprop) | [toMq](#tomq) |
>
>**Live Example:**
>
>[Description Here] parser aka styler.  

**Example**

```javascript
const parser =
```

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.
