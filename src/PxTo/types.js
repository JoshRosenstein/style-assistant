// @flow

export type pxToStrT = (pxValue: number | string) => string
export type pxToNumT = (pxValue: number | string) => number
export type pxToT = ((unit: void) => pxToNumT) & ((unit: string) => pxToStrT)
