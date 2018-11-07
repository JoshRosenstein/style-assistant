// @flow

type NestedObject<T> = {[k: string]: T | NestedObject<T>}

type p1 = <V>(p: Array<string> | string) => (o: NestedObject<V>) => V
type p2 = <V>(p: Array<string> | string) => (o: null | void) => void
type p3 = <V>(p: Array<string> | string) => (o: any) => ?V

export type getThemePT = p1 & p2 & p3
