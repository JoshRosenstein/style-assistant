import {prop} from '@roseys/futils'
import warning from 'warning'
import {isFunction} from 'typed-is'

export default functionName => (name, methods) => {
  const method = prop(name, methods)
  if (!isFunction(method))
    warning(
      false,
      '[Assistant]Plugin %s did not recieve corrent dependent "%s ',
      '',
      functionName,
      name,
    )
  return method
}
