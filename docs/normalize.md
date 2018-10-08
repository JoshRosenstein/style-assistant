#  normalize
| [normalize](#normalize) | [normalizeToEm](#normalizetoem) | [normalizeToRem](#normalizetorem) |
## Overview
### DOCS ARE WIP



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
