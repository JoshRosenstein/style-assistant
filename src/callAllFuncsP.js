import {
  whenFunctionCallWith,
  map,
  isObject,
  toPairs,
  isFunction,
} from '@roseys/futils'

import {containsSpecial} from './utils'

const shouldLoop = (value, selector) =>
  isObject(value) && containsSpecial(selector)

const containsFunc = obj => {
  const functor = toPairs(obj)
  const length = functor.length
  let b = false
  for (let i = 0; i < length; ++i) {
    const a = functor[i]
    if (shouldLoop(a[1], a[0])) {
      b = containsFunc(a[1])
    } else if (isFunction(a[1])) {
      b = true
      break
    }
  }
  return b
}

/// loop through object literal styles as if each value may be a function
export default style => {
  if (!containsFunc(style)) {
    return style
  }
  return props => {
    const mapper = map(
      (v, k) => (shouldLoop(v, k) ? mapper(v) : whenFunctionCallWith(props)(v)),
    )

    return mapper(style)
  }
}
