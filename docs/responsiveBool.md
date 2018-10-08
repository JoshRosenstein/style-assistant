#  responsiveBool
| [responsiveBool](#responsivebool) | [responsiveBoolP](#responsiveboolP) | 
## Overview
### DOCS ARE WIP



>### responsiveBool
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


>### responsiveBoolP
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