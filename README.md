#  style-assistant

style-assistant WIP

[![Build Status](https://travis-ci.org/JoshRosenstein/style-assistant.svg?branch=master)](https://travis-ci.org/JoshRosenstein/style-assistant)
[![npm](https://img.shields.io/npm/dm/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)
[![npm](https://img.shields.io/npm/v/style-assistant.svg)](https://www.npmjs.com/package/style-assistant)



### Table of Contents

* [Installation](#installation)
* [Usage](#usage)
   * [Config](#Config)
  * [responsiveProp](#responsiveProp)
  * [responsiveBoolProp](#responsiveBoolProp)
  * [SwitchProp](#switchProp)
  * [toMq](#toMq)
  * [transformStyle](#transformStyle)
  * [parser](#parser)
  * [pxTo](#pxTo)
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

```javascript
import defaultLookups from './defaultLookups'
import defaultTheme from './theme'

const config={
  defaultTheme,
  baseFontSize: 16,  /// Unitless value used for unit conversions Utils
  themeKey: 'theme', /// Unitless value used for unit conversions Utils
  breakpointsKey: 'breakpoints',
  alwaysTransform: true,
  transformOptions: {
    defaultLookup: true,
    defaultTransform: true,
    keys: defaultLookups.keys,
    getter: defaultLookups.getter,
    functions: defaultLookups.functions
  },
  responsivePropOptions: {
    transform: false
  },
  switchPropOptions: {
    transform: false
  }
}

```
| Key                   | Default Value                                                                                           | Description                                                                              |
|-----------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| defaultTheme          | {}                                                                                                      | defaultTheme is a fallback object if a theme or theme value is not provided within props |
| baseFontSize          | 16                                                                                                      | Used for unit conversion utils                                                           |
| themeKey              | 'theme'                                                                                                 | Although 'theme' is the norm, some other libraries pass theme as '$theme'                |
| breakpointsKey        | 'breakpoints'                                                                                           | This is used for responsive utils and toMq util                                          |
| transformOptions      | {defaultLookup: false,     defaultTransform: false,     keys: {},     getter: {},     functions: {`pxToRem`,`pxToEm`,`pxToPct`}   } | Set Global options for the transformStyle util                                           |
| responsivePropOptions | {transform: false}                                                                                      | Set Global options for responsivePropOptions                                             |
| switchPropOptions     | {transform: false}                                                                                      | Set Global options for switchPropOptions                                                 |



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
/// Any theme attribute can be an value, array or object
export default {
  keys: { /// Default themeKey to use id matching cssProp is found within transformStyle
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
    boxShadow: 'shadows'
  },
  getter: { /// Default getter to use id matching cssProp is found within transformStyle, can be string to match functions below or function
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
    fontSize: 'px'
  },
  functions: {  // Shorthand lookup functions. used in switchProp. If value is a string of one of the keys below, then will call corresponding function with corresponding prop value
    returnAsIs: identity,
    identity,
    propValue: identity,
    self: identity,
    pxToRem,
    pxToEm,
    pxToPct,
    px,
    ms,
    pct,
    '%': pct
  }
}

```
### responsiveBoolProp

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

### toMq

toMq Description

**Example**

```javascript
const toMq =
```

### transformStyle

transformStyle Description

**Example**

```javascript
const transformStyle =
```

### parser

parser Description

**Example**

```javascript
const parser =
```

### pxTo

pxTo Description

**Example**

```javascript
const pxTo =
```
## Contributing

Contributions are welcome! Feel free to open an issue or a pull request and participate at whatever level you would like.

## License

The MIT License - see `LICENSE`.

The Font Awesome icons are licensed under the [CC BY 4.0 License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt).

The Feather icons are licensed under the [MIT License](https://github.com/feathericons/feather/blob/master/LICENSE).

The Material Design icons are licensed under the [Apache License Version 2.0](https://github.com/google/material-design-icons/blob/master/LICENSE).

The Octicons are licensed under the [MIT License](https://github.com/primer/octicons/blob/master/LICENSE).

The SimpleIcons are licensed under the [CC0 1.0 Universal License](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md).

The IonicIcons are licensed under the [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE).
