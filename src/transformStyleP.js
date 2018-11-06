export default function TransformStyleProp({transformStyle, getThemeP}) {
  return function transformStyleProp({postFn, getter, key, path, ...rest}) {
    return function transformStyleP(props) {
      return transformStyle({
        path: key || path,
        postFn: getter || postFn,
        lookUpfn: props ? (v, props) => getThemeP(v)(props) : undefined,
        props,
        ...rest,
      })
    }
  }
}
