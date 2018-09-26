#  style-assistant

style-assistant WIP

[![Build Status](https://travis-ci.org/JoshRosenstein/style-assistant.svg?branch=master)](https://travis-ci.org/JoshRosenstein/style-assistant)
[![npm](https://img.shields.io/npm/dm/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)
[![npm](https://img.shields.io/npm/v/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)


---
### Table of Contents

* [Installation](#installation)
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

## Installation

```
yarn add style-assistant
```

or

```
npm install style-assistant --save
```


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

```javascript
import Assistant from 'style-assistant'
import defaultTheme from './theme'
import defaultLookups from './defaultLookups'

const config = {
  defaultTheme,
  baseFontSize: 16, /// Unitless value used for unit conversions Utils
  themeKey: 'theme', /// Unitless value used for unit conversions Utils
  breakpointsKey: 'breakpoints',
  alwaysTransform: true,
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



### pxTo
**Deps:** | [config.baseFontSize.](#config) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO


**Example**

```javascript
TODO...
```

### pxToEm
**Deps:** | [pxTo](#pxto) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToEm(16) //=> '1em'
```

### pxToRem
**Deps:** | [pxTo](#pxto) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToRem(16) //=> '1rem'
```

### pxToPct
**Deps:** | [pxTo](#pxto) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO

**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToPct(16) //=> '1%'
```

### pxToRelative
**Deps:** | [pxTo](#pxto) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO
Returns untiless relative number.
**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.pxToRelative(16) //=> 1
```

### normalize
**Deps:** | [pxTo](#pxto) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO
**Example**

```javascript
...TODO
```

### normalizeToEm
**Deps:** | [normalize](#normalize) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO
**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.normalizeToEm(16,'.5rem') //=> '2em'
const example2=styler.normalizeToEm(16, 8) //=> '2em'
```

### normalizeToRem
**Deps:** | [normalize](#normalize) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
......TODO
**Example**

```javascript
const styler= new Assistant({baseFontSize:16})
const example=styler.normalizeToEm(16,'.5rem') //=> '2rem'
const example2=styler.normalizeToEm(16, 8) //=> '2rem'
```



### getTheme
**Deps:** | [config.themeKey](#config) | [config.defaultTheme](#config) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/getTheme)

..TODO
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
### toMq
**Deps:** | [pxToEm](#pxtoem) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/toMq)
Used in responsive utilties. quick helper to convert object to media query string. Currently depends on the 'pxToEm' functions.
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


### transformStyle
**Deps:** | [getTheme](#gettheme) | [config.transformOptions](#config) | [config.alwaysTransform](#config) |
**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/transformStyle)
TODO
**Example**

```javascript
const identity = x => x
const transformOptions = {
  keys: {},
  getter: {},
  functions: {
    identity,
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

const defaultTheme = {
  space: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
    xxl: 128,
  }
}

const { transformStyle } = new Assistant({ transformOptions, defaultTheme })
const emptyProps = {}
const withProps = { theme: { colors: { blue: 'myBlueColor' } } }
const exampleOptions = {
  key: 'space',
  getter: 'pxToRem',
}

let o = {}
/// EACH Function below returns '1rem'
o.Converts = transformStyle({
  cssProp: 'marginTop',
  value: 16,
  options: {
    getter: 'pxToRem',
  }
})(emptyProps)
o.looksUpValue = transformStyle({
  cssProp: 'marginTop',
  value: 'md',
  options: {
    key: 'space',
    getter: 'pxToRem',
  }
})(emptyProps)
o.postFnOrGetter = transformStyle({
  cssProp: 'marginTop',
  value: 'md',
  options: {
    key: 'space',
    postFn: 'pxToRem',
  }
})(emptyProps)
/// preFn options runs the raw value before applying theme lookup or getter/postfn
o.preFn = transformStyle({
  cssProp: 'marginTop',
  value: 8,
  options: {
    key: 'space',
    getter: 'pxToRem',
    preFn: v => v * 2
  }
})(emptyProps)
```

### responsiveProp
**Deps:** | [getTheme](#gettheme) | [toMq](#tomq) | [transformStyle](#transformstyle) | [config.breakpointsKey](#config) |
responsiveProp Description

**Example**

```javascript
const responsiveProp =
```

### responsiveBoolProp
**Deps:** | [getTheme](#gettheme) | [toMq](#tomq) | [config.breakpointsKey](#config) |

This function is useful if you have a css property with a static default value, and want to apply to certain breakpoints

**Example**

```javascript

const isHiddenFunc=props=>  responsiveBoolProp({
        T: 'none',// Value If targetProp is True
        F: 'block', /// if not False value provided, value will be undefined and will return an empty {}
        cssProp: 'display',
        prop: 'isHidden', /// If prop is not provided, the targetProp will default to cssProp
      }) (props)

const propsAsObjectLit={ isHidden:{ default: false, tablet: true },
                        theme:{breakpoints:{tablet:'40em'}} }
const propsAsArray={isHidden:[false,true],
                    theme:{breakpoints:{tablet:'40em'}} }

const example1=isHiddenFunc(propsAsObjectLit)
const example2=isHiddenFunc(propsAsArray)
//result => {'@media screen and (min-width:40em)': { display: 'none' },display: 'block'}
```

### switchProp
**Deps:** | [responsiveProp](#responsiveprop)| [responsiveBoolProp](#responsiveboolprop) | [transformStyle](#transformstyle) | [config.transformOptions.functions](#config) | [config.switchPropOptions](#config) |

Useful SwitchStatement like style block.

**Basic Example**
```javascript
///If needing just the value, no need to supply cssProp
const getColor=props=>  switchProp({
  color:(value,props)=>value,  /// can accept functions
  primary:'blue',
  secondary:'red',
  default:'black'
}) (props)

const example1=getColor({primary:true}) //=> returns 'blue'
const example2=getColor({secondary:true}) //=> returns 'red'
// The order of keys within switchProps is important
const example3=getColor({primary:true,color:'pink'}) //=> returns 'pink'  

const example4=getColor({}) //=> returns 'black'

///If needing just the value, no need to supply cssProp
const getColorStyle=props=>  switchProp({
  primary:'blue',
  secondary:'red',
  default:'black'
},{cssProp:"backgroundColor"} ) (props)

const example11=getColorStyle({primary:true}) //=> returns {backgroundColor:'blue'}
const example22=getColorStyle({secondary:true}) //=> returns {backgroundColor:'red'}
const example33=getColorStyle({}) //=> returns {backgroundColor:'black'}
```
**Responsive Example**
```javascript

```

### parser
**Deps:** | [switchProp](#switchprop) | [responsiveProp](#responsiveprop) | [responsiveBoolProp](#responsiveboolprop) | [toMq](#tomq) |
parser aka styler

**Example**

```javascript
const parser =
```

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.
