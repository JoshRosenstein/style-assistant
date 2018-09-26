import transformStyle from './__utils__/transformStyle'

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('Works ', () => {
    const e = transformStyle({
      value: 'sm',
      cssProp: 'margin',
      options: {
        key: 'space'
      }
    })({})

    const r = { margin: '0.5rem' }

    expect(e).toEqual(r)
  })

  it('References Getter Dictionary ', () => {
    const e = transformStyle({
      cssProp: 'marginTop',
      value: 16,
      options: {
        key: 'space',
        getter: 'pxToRem',
        defaultLookup: false,
        defaultTransform: false
      }
    })({})
    const r = { marginTop: '1rem' }

    expect(e).toEqual(r)
  })
})