// @flow

type NestedObject<T> = {[k: string]: T | NestedObject<T>}

type p1 = <V>(o: {defaultTheme: NestedObject<V>}) => (
  path: Array<string> | string,
) => V
type p2 = <V>(o: {defaultTheme: null | void}) => (
  path: Array<string> | string,
) => void
type p3 = <V>(o: {defaultTheme: any}) => (path: Array<string> | string) => ?V

export type CreateGetDefaultThemeT = p1 & p2 & p3
