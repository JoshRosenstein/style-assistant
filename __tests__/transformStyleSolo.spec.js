import transformStyle from './__utils__/transformStyle'

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  it('Works ', () => {
    //  log.getLogger('transformStyle').setLevel(0)
    const e = transformStyle({
      value: 'sm',
      cssProp: 'margin',
      options: {
        key: 'space'
      }
    })({})

    const r = { margin: '0.5rem' }
    // log.getLogger('transformStyle').setLevel(3)
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

  it('Can use Numbers to reference key', () => {
    const e = transformStyle({
      cssProp: 'marginTop',
      value: 1,
      key: 'space',
      getter: 'pxToRem',
      defaultLookup: false,
      defaultTransform: false
    })({ theme: { space: [0, 16, 4, 6, 8] } })
    const r = { marginTop: '1rem' }

    expect(e).toEqual(r)
  })
})
