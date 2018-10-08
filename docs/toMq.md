#  toMq
## Overview
### DOCS ARE WIP


>>### toMq
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
