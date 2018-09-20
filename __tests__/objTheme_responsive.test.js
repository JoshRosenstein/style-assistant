import Assistant from '../src/index'

import testThemeObj from './__utils__/testThemeObj'

const styler = new Assistant({ defaultTheme: testThemeObj })

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
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

  it('Returns Target Value For True And False mapping ', () => {
    const StandardProps = false
    const ArrayProps = [false, true]
    const ObjProps = { default: false, mobile: true }
    const FN = PV =>
      styler.responsiveBoolProp({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: TargetProp
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult)
    expect(FN(ObjProps)).toEqual(ObjResult)
  })

  it('Returns Target Value For Values ', () => {
    const StandardProps = 'block'
    const ArrayProps = ['block', 'none']
    const ObjProps = { default: 'block', mobile: 'none' }
    const FN = PV =>
      styler.responsiveProp({
        cssProp: 'display',
        prop: TargetProp
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult)
    expect(FN(ObjProps)).toEqual(ObjResult)
  })
})

describe('responsiveBoolProp', () => {
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

  it('Returns Target Value For True And False mapping ', () => {
    const StandardProps = false
    const ArrayProps = [false, true]
    const ObjProps = { default: false, mobile: true }
    const FN = PV =>
      styler.responsiveBoolProp({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: TargetProp
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult) // BUG
    expect(FN(ObjProps)).toEqual(ObjResult)
  })
})

describe(' Basic responsiveProp', () => {
  it('Returns Target Value', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: 'targetPropValue' })

    const e = { paddingTop: 'targetPropValue' }

    expect(t).toEqual(e)
  })

  it('[ArrayProp] Returns Target Value ', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: ['targetPropValue'] })

    const e = { paddingTop: 'targetPropValue' }

    expect(t).toEqual(e)
  })

  it('[ObjectProp] Returns Target Value ', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: { default: 'targetPropValue' } })

    const e = { paddingTop: 'targetPropValue' }

    expect(t).toEqual(e)
  })

  it('Returns defaultValue if False', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: false })

    const e = { paddingTop: '16px' }

    expect(t).toEqual(e)
  })

  it('[ArrayProp] Returns defaultValue if False ', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: [false] })

    const e = { paddingTop: '16px' }

    expect(t).toEqual(e)
  })

  it('[ObjectProp] Returns Target Value ', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: { default: 'targetPropValue' } })

    const e = { paddingTop: 'targetPropValue' }

    expect(t).toEqual(e)
  })

  it('Returns defaultValue if undefined', () => {
    const t = styler.responsiveProp({
      cssProp: 'paddingTop',
      defaultValue: '16px',
      prop: 'Target'
    })({ Target: undefined })

    const e = { paddingTop: '16px' }

    expect(t).toEqual(e)
  })
})
