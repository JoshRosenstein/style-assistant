import {
  firstNonNil,
  safeMapValues,
  isTemplate,
  extractTemplateValue,
  arrToObj,
  isBool,
  isTruthy,
  isNonZeroNumber,
  appendUnit
} from '../src/utils'

describe('Utils', () => {
  it('firstNonNil', () => {
    expect(firstNonNil([null, undefined, 1, 2, 3])).toEqual(1)
  })

  it('safeMapValues', () => {
    const addOne = v => v + 1
    expect(safeMapValues(addOne, [1, 2, 3])).toEqual([2, 3, 4])
    expect(safeMapValues(addOne, 1)).toEqual(2)
    expect(safeMapValues(addOne, [1])).toEqual([2])
    expect(safeMapValues(addOne, [])).toEqual([])
  })

  it('isTemplate', () => {
    expect(isTemplate('Margin')).toBeFalsy()

    expect(isTemplate('{!Margin}')).toBeTruthy()
  })

  it('extractTemplateValue', () => {
    expect(extractTemplateValue('{!1}')).toEqual('1')
    expect(extractTemplateValue('{! 1 }')).toEqual('1')
  })

  it('arrToObj', () => {
    expect(arrToObj([1, 2])).toEqual({ '0': 1, '1': 2 })
    expect(arrToObj([])).toEqual({})
  })

  it('isBool', () => {
    expect(isBool([1, 2])).toBeFalsy()
    expect(isBool(0)).toBeFalsy()
    expect(isBool(null)).toBeFalsy()
    expect(isBool(true)).toBeTruthy()
    expect(isBool(false)).toBeTruthy()
  })

  it('isTruthy', () => {
    expect(isTruthy([1, 2])).toBeTruthy()
    expect(isTruthy(0)).toBeTruthy()
    expect(isTruthy(null)).toBeFalsy()
    expect(isTruthy(true)).toBeTruthy()
    expect(isTruthy(false)).toBeFalsy()
  })

  it('isNonZeroNumber', () => {
    expect(isNonZeroNumber([1, 2])).toBeFalsy()
    expect(isNonZeroNumber(0)).toBeFalsy()
    expect(isNonZeroNumber(null)).toBeFalsy()
    expect(isNonZeroNumber(true)).toBeFalsy()
    expect(isNonZeroNumber(false)).toBeFalsy()
    expect(isNonZeroNumber(1)).toBeTruthy()
    expect(isNonZeroNumber(-1)).toBeTruthy()
  })

  it('isNonZeroNumber', () => {
    expect(appendUnit('rem')(1)).toEqual('1rem')
    expect(appendUnit('rem')('1em')).toEqual('1em')
    expect(appendUnit('rem')(0)).toEqual(0)
  })
})
