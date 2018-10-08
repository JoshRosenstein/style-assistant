#  responsive
| [responsive](#responsive) | [responsiveP](#responsivep) | 
## Overview
### DOCS ARE WIP


### responsive
>---
>**Deps:** | [TODO](#gettheme) | [toMq](#tomq) | [transformStyle](#transformstyle) | [config.breakpointsKey](#config) |
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