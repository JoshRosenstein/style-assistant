export default pxToRelative => (value, base, unit = '') =>
  parseFloat(pxToRelative(value)) / parseFloat(pxToRelative(base)) + unit
