import Assistant from '../src/index'

import testThemeArr from './__utils__/testThemeArr'
import testThemeObj from './__utils__/testThemeObj'

import config from './__utils__/testDefaultConfig'

const styler1 = new Assistant({ ...config, defaultTheme: testThemeArr })
const styler2 = new Assistant({ ...config, defaultTheme: testThemeObj })

describe('Array Theme Keys and Object Theme Keys', () => {
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
    const Func = (func, FNconfig) => propValue =>
      func(FNconfig)({ [TargetProp]: propValue })

    it('responsiveBoolProp ', () => {
      const StandardProps = false
      const ArrayProps = [false, true]
      const ObjProps = { default: false, mobile: true }
      const config = {
        T: 'none',
        F: 'block',
        cssProp: 'display',
        prop: TargetProp
      }

      const FN1 = Func(styler1.responsiveBoolProp, config)
      const FN2 = Func(styler2.responsiveBoolProp, config)

      expect(FN1(StandardProps)).toEqual(StandardResult)
      expect(FN1(ArrayProps)).toEqual(ArrayResult)

      expect(FN2(StandardProps)).toEqual(StandardResult)
      expect(FN2(ArrayProps)).toEqual(ArrayResult)
      expect(FN2(ObjProps)).toEqual(ObjResult)
    })

    it('responsiveProp', () => {
      const StandardProps = 'block'
      const ArrayProps = ['block', 'none']
      const ObjProps = { default: 'block', mobile: 'none' }

      const config = {
        cssProp: 'display',
        prop: TargetProp,
        transform: false
      }

      const FN1 = Func(styler2.responsiveProp, config)
      const FN2 = Func(styler2.responsiveProp, config)

      expect(FN1(StandardProps)).toEqual(StandardResult)
      expect(FN1(ArrayProps)).toEqual(ArrayResult)

      expect(FN2(StandardProps)).toEqual(StandardResult)
      expect(FN2(ArrayProps)).toEqual(ArrayResult)
      expect(FN2(ObjProps)).toEqual(ObjResult)
    })
  })

  describe('Basic responsiveProp', () => {
    const Func = (func, FNconfig) => props => func(FNconfig)(props)

    it('Returns Target Value', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target',
        transform: false
      }
      const props = { Target: 'targetPropValue' }
      const result = { paddingTop: 'targetPropValue' }

      const FN1 = Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toEqual(result)
      expect(FN2).toEqual(result)
    })

    it('[ArrayProp] Returns Target Value ', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target',
        transform: false
      }
      const props = { Target: ['targetPropValue'] }
      const result = { paddingTop: 'targetPropValue' }

      const FN1 = Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toEqual(result)
      expect(FN2).toEqual(result)
    })

    it('[ObjectProp] Returns Target Value ', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target',
        transform: false
      }
      const props = { Target: { default: 'targetPropValue' } }
      const result = { paddingTop: 'targetPropValue' }

      const FN1 = () => Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toThrow()
      expect(FN2).toEqual(result)
    })

    it('Returns defaultValue if False', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target'
      }
      const props = { Target: false }
      const result = { paddingTop: '16px' }

      const FN1 = Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toEqual(result)
      expect(FN2).toEqual(result)
    })

    it('[ArrayProp] Returns defaultValue if False ', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target',
        transform: false
      }

      const props = { Target: [false] }
      const result = { paddingTop: '16px' }

      const FN1 = Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toEqual(result)
      expect(FN2).toEqual(result)
    })

    it('[ObjectProp] Returns Target Value ', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target'
      }

      const props = { Target: { default: 'targetPropValue' } }
      const result = { paddingTop: 'targetPropValue' }

      const FN1 = () => Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toThrow()
      expect(FN2).toEqual(result)
    })

    it('Returns defaultValue if undefined', () => {
      const FNconfig = {
        cssProp: 'paddingTop',
        defaultValue: '16px',
        prop: 'Target'
      }

      const props = { Target: undefined }
      const result = { paddingTop: '16px' }

      const FN1 = Func(styler1.responsiveProp, FNconfig)(props)
      const FN2 = Func(styler2.responsiveProp, FNconfig)(props)

      expect(FN1).toEqual(result)
      expect(FN2).toEqual(result)
    })
  })
})
