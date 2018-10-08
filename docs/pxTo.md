#  pxTo
| [pxTo](#pxto) | [pxToEm](#pxtoem) | [pxToRem](#pxtorem) | [pxToPct](#pxtopct) | [pxToRelative](#pxtorelative) |
## Overview
### DOCS ARE WIP



>### pxTo
>---
>**Deps:** | [config.baseFontSize.](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/units)
>
>unit => pxNumber || pxString => converted
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
