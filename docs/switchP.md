#  switchP
## Overview
### DOCS ARE WIP


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