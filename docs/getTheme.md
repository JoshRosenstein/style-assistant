#  getTheme
## Overview
### DOCS ARE WIP
getTheme=> themeKey 
getThemeP=>themeKey=>props

### getTheme
>---
>**Deps:** | [config.themeKey](#config) | [config.defaultTheme](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/getTheme)
>
>[Description Here]

**Example**

```javascript
const defaultTheme = { colors: { "red": "#f5222d" } }
const { getThemeP } = new Assistant({ defaultTheme })
const emptyProps = {}
const withProps = { theme: { colors: { blue: 'myBlueColor' } } }

let o = {}
o.withEmptyProps = getTheme('colors') //=>"red": "#f5222d"
o.dotNotation = getTheme('colors.red') //=>"#f5222d",
```
>

### getThemeP
>---
>**Deps:** | [config.themeKey](#config) | [config.defaultTheme](#config) |
>
>**Live Example:** [Sandbox](https://nr15m67qzp.codesandbox.io/getTheme)
>
>[Description Here]

**Example**

```javascript
const defaultTheme = { colors: { "red": "#f5222d" } }
const { getThemeP } = new Assistant({ defaultTheme })
const emptyProps = {}
const withProps = { theme: { colors: { blue: 'myBlueColor' } } }

let o = {}
o.withEmptyProps = getThemeP('colors')(emptyProps) //=>"red": "#f5222d"
o.withProps = getThemeP('colors')(withProps) //=>"blue": "myBlueColor"
o.dotNotation = getThemeP('colors.red')(emptyProps) //=>"#f5222d",
o.fallsBacktoDefaultTheme = getThemeP('colors.red')(withProps) //=> "#f5222d"

```