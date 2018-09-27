import Assistant from '../src/index'
import testTheme from './__utils__/testThemeObj'

describe('Switch Prop', () => {
  const switchConfig = {
    basic: 'basicValue',
    basic2: 'basic2Value',
    basicFunc: v => v,
    basicFuncProps: (v, p) => (p.customProp ? p.customProp : v),
    basic3: 'basic2Value',
    default: 'defaultValue'
  }
  const CSSPROP = 'margin'

  describe('SwitchProp Without Transformer', () => {
    const { switchProp } = new Assistant({ defaultTheme: testTheme })

    it('[Fallsback to default] when has empty Props', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({})
      const r = { [CSSPROP]: 'defaultValue' }
      expect(e).toEqual(r)
    })
    it('[Fallsback to default] when has matched props that are false or null', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: null,
        basic2: false
      })
      const r = { [CSSPROP]: 'defaultValue' }
      expect(e).toEqual(r)
    })
    it('[Returns basicValue] when basic prop is true', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: true
      })
      const r = { [CSSPROP]: 'basicValue' }
      expect(e).toEqual(r)
    })

    it('[Returns basicValue] when basic prop is not nill', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: '1'
      })
      const r = { [CSSPROP]: 'basicValue' }
      expect(e).toEqual(r)
    })

    it('[Matched with a Function] Returns PropValue when matched key is a basicFunc', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basicFunc: 'basicFuncValue'
      })
      const r = { [CSSPROP]: 'basicFuncValue' }
      expect(e).toEqual(r)
    })

    it('[Matched with a Function] allows functions with props as second argument ', () => {
      expect(
        switchProp(switchConfig, { cssProp: CSSPROP })({
          basicFuncProps: 'basicFuncValue'
        })
      ).toEqual({ [CSSPROP]: 'basicFuncValue' })

      expect(
        switchProp(switchConfig, { cssProp: CSSPROP })({
          basicFuncProps: 'basicFuncValue',
          customProp: 'customPropValue'
        })
      ).toEqual({ [CSSPROP]: 'customPropValue' })
    })

    it('[responsiveProp] doesnt passes to responsiveProp without responsive true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: false
      })({
        basicFunc: [1, 2]
      })

      const e2 = switchProp(switchConfig, {
        cssProp: CSSPROP
      })({
        basicFunc: [1, 2]
      })

      const r = { [CSSPROP]: [1, 2] }

      expect(e).toEqual(r)
      expect(e2).toEqual(r)
    })

    it('[responsiveProp] passes to responsiveProp if responsive true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: true
      })({
        basicFunc: [1, 2]
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': { [CSSPROP]: 2 },
        [CSSPROP]: 1
      }

      expect(e).toEqual(r)
    })

    it('[responsiveBoolProp] passes to responsiveBoolProp if responsiveBool true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsiveBool: true
      })({
        basic: [false, true]
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': { [CSSPROP]: 'basicValue' }
      }

      expect(e).toEqual(r)
    })
  })

  describe('SwitchProp With Transformer', () => {
    const defaultTransformer = v => v + 1
    const defaultThemeKey = 'space'
    const { switchProp } = new Assistant({
      defaultTheme: testTheme,
      switchPropOptions: {
        transform: true
      },
      transformOptions: {
        defaultLookup: true,
        defaultTransform: true,
        keys: { [CSSPROP]: defaultThemeKey },
        getter: { [CSSPROP]: 'defaultTransformer' },
        functions: { defaultTransformer }
      }
    })

    it('[Fallsback to default] does default Transform', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({})
      const r = { [CSSPROP]: defaultTransformer('defaultValue') }
      expect(e).toEqual(r)
    })
    it('[Fallsback to default] when has matched props that are false or null', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: null,
        basic2: false
      })
      const r = { [CSSPROP]: defaultTransformer('defaultValue') }
      expect(e).toEqual(r)
    })
    it('[Returns basicValue] when basic prop is true', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: true
      })
      const r = { [CSSPROP]: defaultTransformer('basicValue') }
      expect(e).toEqual(r)
    })

    it('[Returns basicValue] when basic prop is not nill', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basic: '1'
      })
      const r = { [CSSPROP]: defaultTransformer('basicValue') }
      expect(e).toEqual(r)
    })

    it('[Matched with a Function] Returns PropValue when matched key is a basicFunc', () => {
      const e = switchProp(switchConfig, { cssProp: CSSPROP })({
        basicFunc: 'basicFuncValue'
      })
      const r = { [CSSPROP]: defaultTransformer('basicFuncValue') }
      expect(e).toEqual(r)
    })

    it('[Matched with a Function] allows functions with props as second argument ', () => {
      expect(
        switchProp(switchConfig, { cssProp: CSSPROP })({
          basicFuncProps: 'basicFuncValue'
        })
      ).toEqual({ [CSSPROP]: defaultTransformer('basicFuncValue') })

      expect(
        switchProp(switchConfig, { cssProp: CSSPROP })({
          basicFuncProps: 'basicFuncValue',
          customProp: 'customPropValue'
        })
      ).toEqual({ [CSSPROP]: defaultTransformer('customPropValue') })
    })

    it('[responsiveProp] doesnt passes to responsiveProp without responsive true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: false
      })({
        basicFunc: [1, 2]
      })

      const e2 = switchProp(switchConfig, {
        cssProp: CSSPROP
      })({
        basicFunc: [1, 2]
      })

      const r = { [CSSPROP]: defaultTransformer([1, 2]) }

      expect(e).toEqual(r)
      expect(e2).toEqual(r)
    })

    it('[responsiveProp] passes to responsiveProp if responsive true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: true
      })({
        basicFunc: [1, 2]
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': {
          [CSSPROP]: defaultTransformer(2)
        },
        [CSSPROP]: defaultTransformer(1)
      }

      expect(e).toEqual(r)
    })

    it('[responsiveBoolProp] passes to responsiveBoolProp if responsiveBool true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsiveBool: true
      })({
        basic: [false, true]
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': {
          [CSSPROP]: defaultTransformer('basicValue')
        }
      }

      expect(e).toEqual(r)
    })

    it('[responsiveBoolProp] passes to responsiveBoolProp if responsiveBool true', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsiveBool: true
      })({
        basic: [false, true]
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': {
          [CSSPROP]: defaultTransformer('basicValue')
        }
      }

      expect(e).toEqual(r)
    })

    it('extracts theme key balue and applies transformer', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: true
      })({
        basicFunc: 'sm'
      })

      const r = {
        [CSSPROP]: defaultTransformer(testTheme[defaultThemeKey].sm)
      }

      expect(e).toEqual(r)
    })

    it('Does Not extracts theme key balue and applies transformer if transformer overide to false', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: true,
        transform: false
      })({
        basicFunc: 'sm'
      })

      const r = {
        [CSSPROP]: 'sm'
      }

      expect(e).toEqual(r)
    })

    it('responsiveProp+themeKeyLookUp', () => {
      const e = switchProp(switchConfig, {
        cssProp: CSSPROP,
        responsive: true
      })({
        basicFunc: ['sm', 'md']
      })

      const r = {
        '@media screen and (min-width:1BP_Test)': {
          [CSSPROP]: defaultTransformer(testTheme[defaultThemeKey].md)
        },
        [CSSPROP]: defaultTransformer(testTheme[defaultThemeKey].sm)
      }

      expect(e).toEqual(r)
    })
  })
})
