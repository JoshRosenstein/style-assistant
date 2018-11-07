// @flow

export type pxToStrT = (pxValue: number | string) => string
export type pxToNumT = (pxValue: number | string) => number
export type pxToT = (
  unit: string | void,
) => (pxValue: number | string | void) => number | string | void
