import Assistant from '../src/index'

import testTheme from './__utils__/testThemeArr'

import config from './__utils__/testDefaultConfig'


const styler = new Assistant({ ...config, defaultTheme: testTheme })

describe('How responsiveBoolProp and can be equivlent to responsiveProp', () => {
  const TargetProp = 'isHidden'
  const StandardResult = { display: 'block' }
  const ArrayResult = {
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
  })

  it('Returns Target Value For Values ', () => {
    const StandardProps = 'block'
    const ArrayProps = ['block', 'none']
    const ObjProps = { default: 'block', mobile: 'none' }
    const FN = PV =>
      styler.responsiveProp({
        cssProp: 'display',
        prop: TargetProp,
        transform: false
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult)
  })
})

describe.skip('responsiveBoolProp', () => {
  const TargetProp = 'isHidden'
  const StandardResult = { display: 'block' }
  const ArrayResult = {
    '@media screen and (min-width:1BP_Test)': { display: 'none' },
    display: 'block'
  }

  it('Returns Target Value For True And False mapping ', () => {
    const StandardProps = false
    const ArrayProps = [false, true]

    const FN = PV =>
      styler.responsiveBoolProp({
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: TargetProp
      })({ [TargetProp]: PV })

    expect(FN(StandardProps)).toEqual(StandardResult)
    expect(FN(ArrayProps)).toEqual(ArrayResult)
  })
})

// it("Works", () => {
//   const a = styler.responsiveBoolProp({
//     cssProp: "paddingTop",
//     defaultValue: "16px",
//     prop: "Target",
//     transformValue: (v, props) =>
//       styler.pxToRem(styler.getThemeOr(["space", v], v)(props))
//   })({ Target: [-16, 18] });

//   expect(a).toEqual({ "@media screen and (min-width:1BP_Test)": { "paddingTop": "1.125rem" }, "paddingTop": "-1rem" }),

//   })
