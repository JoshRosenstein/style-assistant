#  transformStyle
| [transformStyle](#transformstyle) | [transformStyleP](#transformstylep) | 
## Overview
### DOCS ARE WIP


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


>### transformStyleP
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