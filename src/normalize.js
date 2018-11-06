// @flow

export default (pxToRelative: Function) => (unit: '') => (
  value: number | string,
  base: number | string,
): string =>
  parseFloat(pxToRelative(value)) / parseFloat(pxToRelative(base)) + unit
