import responsiveBoolProp from './__utils__/responsiveBoolProp'

describe('responsiveBoolPropSolo', () => {
  it('Returns Target Value For True And False mapping ', () => {
    const TargetProp = 'isHidden'
    const StandardResult = { display: 'block' }
    const ArrayResult = {
      '@media screen and (min-width:1BP_Test)': { display: 'none' },
      display: 'block'
    }
    const ObjResult = {
      '@media screen and (min-width:1BP_Test)': { display: 'none' },
      display: 'block'
    }

    const StandardProps = false
    const ArrayProps = [false, true]
    const ObjProps = { default: false, mobile: true }
    const FN = PV =>
      responsiveBoolProp({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: TargetProp
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult)
    expect(FN(ObjProps)).toEqual(ObjResult)
  })
})
