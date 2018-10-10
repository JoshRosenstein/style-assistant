import Assistant from '../src/index'
import config from './__utils__/testDefaultConfig'

const { 
  parse: styler,
  getThemeP,
  transformStyleP,
  switchP: switchProp
} = new Assistant(config)

const StylerEq = ({ args, props, result }) => {
  expect(styler(args)(props)).toEqual(result)
}

const StylerTest = (Name, args) =>
  it(Name, () => {
    StylerEq(args)
  })


describe('Styler', () => {
  it('Sorted Keys', () => {
    expect(
      styler({
        backgroundRepeat: 4,
        backgroundColor: 2,
        backgroundImage: 3,
        background: 1,
        borderLeft: 6,
        border: 5
      })({})
    ).toEqual({
      background: 1,
      backgroundColor: 2,
      backgroundImage: 3,
      backgroundRepeat: 4,
      border: 5,
      borderLeft: 6
    })
  })

  it('Responsive Array', () => {
    expect(
      styler({
        border: [5,4,3,2]
      })({})
    ).toEqual({'@media screen and (min-width:1BP_Test)': {'border': 4}, '@media screen and (min-width:2BP_Test)': {'border': 3}, '@media screen and (min-width:3BP_Test)': {'border': 2}, 'border': 5})

  })


  it('Responsive Object', () => {
    expect(
      styler({
        border: {
          'default':5,
          'mobile':4,
          'tablet':3,
          'laptop':2
        }
      })({})
    ).toEqual({'@media screen and (min-width:1BP_Test)': {'border': 4}, '@media screen and (min-width:2BP_Test)': {'border': 3}, '@media screen and (min-width:3BP_Test)': {'border': 2}, 'border': 5})

  })

  describe('Duplicate Keys Issue', () => {
    it('Template', () => {
      expect(styler({ border: 1, border__2: 2 })({})).toEqual({ border: 2 })
    })

    it('with MQ', () => {
      expect(
        styler({
          mq_mobile__1: { border: 1 },
          mq_mobile__2: { borderTop__2: 2 }
        })({ theme: { breakpoints: { mobile: 'BpFromProps' } } })
      ).toEqual({
        '@media screen and (min-width:BpFromProps)': {
          border: 1,
          borderTop: 2
        }
      })
    })
  })

  describe('MQ Selector', () => {
    expect(
      styler({ mq_mobilee: { marginTop: { margin: 'self' } } })({
        margin: '16px'
      })
    ).toEqual({
      '@media screen and (min-width:mobilee)': { marginTop: '16px' }
    })

    expect(
      styler({
        MQ_desktop: {
          alignItems: 'stretch',
          display: 'flex',
          justifyContent: 'flex-end',
          marginLeft: 'auto'
        }
      })({
        margin: '1px',
        theme: { breakpoints: { desktop: 'desktop' } }
      })
    ).toEqual({
      '@media screen and (min-width:desktop)': {
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 'auto'
      }
    })
  })

  describe('Simple Match Boolean Execution', () => {
    const testStyler = styler({
      testCSSProp: {
        red: 'red',
        blue: 'blue',
        default: 'white'
      }
    })
    it('It Should return result of first Match', () => {
      expect(testStyler({ red: true })).toEqual({ testCSSProp: 'red' })
    })
    it('It Should return blue', () => {
      expect(testStyler({ blue: true })).toEqual({ testCSSProp: 'blue' })
    })

    it('It Should return result of first Match with multiple matches', () => {
      expect(testStyler({ red: true, blue: true })).toEqual({
        testCSSProp: 'red'
      })
    })
    it('It Should return default when no matches', () => {
      expect(testStyler({})).toEqual({ testCSSProp: 'white' })
    })
    it('Should not depend on prop order', () => {
      const props1 = { mode: 'dark', nextOne: 'hello' }
      const props2 = { nextOne: 'hello', mode: 'dark' }
      const rules1 = {
        color: {
          mode: value => value === 'dark' && 'navy',
          nextOne: 'purple',
          default: 'green'
        }
      }
      const rules2 = {
        color: {
          nextOne: 'purple',
          mode: value => value === 'dark' && 'navy',
          default: 'green'
        }
      }

      const result1 = styler(rules1)(props1)
      const result2 = styler(rules1)(props2)
      const result3 = styler(rules2)(props1)
      const result4 = styler(rules2)(props2)
      expect(result1).toEqual(result2)
      expect(result3).toEqual(result4)
      expect(result1).not.toEqual(result3)
    })
  })

  describe('Functional Matches Execution', () => {
    const testStyler = styler({
      testCSSProp: {
        addOne: v => v,
        returnPropValue: v => v,
        returnAsIs: 'returnAsIs',
        dependsOnOtherProp: (value, p) => p.otherProp,
        getThemePColor: (value, p) => getThemeP(`colors.${value}`)(p),
        default: 'white'
      }
    })

    it('will render a block of styles for a block pattern', () => {
      const testBlock = styler({
        __match: {
          mode: {
            fontWeight: 'bold',
            color: 'purple'
          },
          nextOne: value => ({
            color: value,
            border: '1px solid #ccc'
          })
        }
      })
      const result = testBlock({ nextOne: 'dodgerblue', mode: 'hi there' })
      expect(result).toEqual({
        border: '1px solid #ccc',
        color: 'dodgerblue',
        fontWeight: 'bold'
      })
    })

    it('block pattern does not return false bool matches', () => {
      const testBlock = styler({
        __match: {
          isActive: {
            fontWeight: 'bold',
            color: 'purple'
          }
        }
      })
      expect(testBlock({ isActive: true })).toEqual({
        color: 'purple',
        fontWeight: 'bold'
      })
      expect(testBlock({ isActive: false })).toEqual({})
    })
    it('will merge block of styles for a block pattern correctly', () => {
      const testBlock = styler({
        cursor: 'pointer',
        display: 'inline-block',
        minHeight: '1em',
        outline: 'none',
        border: 'none',
        __match: {
          mode: {
            fontWeight: 'bold',
            color: 'purple'
          },
          nextOne: value => ({
            color: value,
            border: '1px solid #ccc'
          })
        }
      })
      const result = testBlock({ nextOne: 'dodgerblue', mode: 'hi there' })
      expect(result).toEqual({
        border: '1px solid #ccc',
        color: 'dodgerblue',
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: 'bold',
        minHeight: '1em',
        outline: 'none'
      })
    })

    it('Can return propValue using Custom', () => {
      const testProps = {
        returnPropValue: 'ThisWillBeReturned'
      }
      const result = {
        testCSSProp: 'ThisWillBeReturned'
      }
      expect(testStyler(testProps)).toEqual(result)
    })

    it('Can return propValue using returnAsIs', () => {
      const testProps = {
        returnAsIs: 'ThisWillBeReturned'
      }
      const result = {
        testCSSProp: 'ThisWillBeReturned'
      }
      expect(testStyler(testProps)).toEqual(result)
    })

    it('Can reference other props', () => {
      const testProps = {
        dependsOnOtherProp: true,
        otherProp: 'blue'
      }
      const result = {
        testCSSProp: 'blue'
      }
      expect(testStyler(testProps)).toEqual(result)
    })
    it('Can use getThemePAttr', () => {
      const testProps = {
        getThemePColor: 'blue',
        theme: {
          colors: { blue: 'Themedblue' }
        }
      }
      const result = {
        testCSSProp: 'Themedblue'
      }
      expect(testStyler(testProps)).toEqual(result)
    })
  })

  describe('Styler accepts Functions Dependent on Props', () => {
    const ifFunction = ({ shouldExecute }) =>
      shouldExecute ? { testCSSProp: 'returned' } : {}

    const testStyler = styler(ifFunction)
    it('Works ', () => {
      expect(
        testStyler({
          shouldExecute: true
        })
      ).toEqual({
        testCSSProp: 'returned'
      })
      expect(
        testStyler({
          shouldExecute: false
        })
      ).toEqual({})
    })
  })
  describe('DEFAULT_RULE_KEY_LOOKUP', () => {
    it('transformStyleP Test', () => {
      const testStyler = transformStyleP({
        cssProp: 'margin',
        value: 'small',
        key: 'customSpace'
      })
      const testProps = {
        theme: {
          customSpace: { small: 'returnThis' }
        }
      }
      const result = {
        margin: 'returnThis'
      }
      expect(testStyler(testProps)).toEqual(result)
    })

    it('SwitchProp to transformStyleP Test', () => {
      const testStyler = switchProp(
        {
          isSmall: 'small'
        },
        {
          cssProp: 'this',

          transform: true,
          key: 'customSpace'
        }
      )
      const testProps = {
        isSmall: true,
        theme: {
          customSpace: { small: 'returnThis' }
        }
      }
      const result = {
        this: 'returnThis'
      }
      expect(testStyler(testProps)).toEqual(result)
    })

    it('Autolooks for key in theme if Rule has a default Key ', () => {
      const testStyler = styler({
        margin: {
          isSmall: 'small',
          options: {
            key: 'customSpace',
            transform: true
          }
        }
      })
      const testProps = {
        isSmall: true,
        theme: {
          customSpace: { small: 'returnThis' }
        }
      }
      const result = {
        margin: 'returnThis'
      }
      expect(testStyler(testProps)).toEqual(result)
    })
    it('Only Works when inside object', () => {
      const testStyler = styler({
        margin: 'small'
      })
      const testProps = {
        theme: {
          space: { small: 'returnThis' }
        }
      }
      const result = {
        margin: 'small'
      }
      expect(testStyler(testProps)).toEqual(result)
    })
  })

  describe('Can accept Arrays', () => {
    it('Should execute if a Single Array Objects', () => {
      const testStyler = styler({
        testCSSProp: 'returnThis'
      })

      expect(testStyler({})).toEqual({
        testCSSProp: 'returnThis'
      })
    })

    it('Should execute if a Multiple Array Objects', () => {
      const testStyler = styler([
        {
          testCSSProp: 'returnThis'
        },
        {
          testCSSProp2_: 'returnThis'
        }
      ])

      expect(testStyler({})).toEqual({
        testCSSProp: 'returnThis',
        testCSSProp2_: 'returnThis'
      })
    })
    it('Should execute if a Single Array Nested Styler Function', () => {
      const testStyler = styler(
        styler({
          testCSSProp: 'returnThis'
        })
      )

      expect(testStyler({})).toEqual({
        testCSSProp: 'returnThis'
      })
    })

    it('Should execute if Multiple Array Nested Styler Functions', () => {
      const testStyler = styler([
        styler({
          testCSSProp: 'returnThis'
        }),
        styler({
          testCSSProp2: 'returnThis'
        })
      ])

      expect(testStyler({})).toEqual({
        testCSSProp: 'returnThis',
        testCSSProp2: 'returnThis'
      })
    })

    it('Should Properly Merge Nested Selectors', () => {
      const testStyler = styler({
        testCSSProp: {
          contollerProp: 'self',
          options: {
            responsive: true
          }
        },
        testCSSProp2: {
          contollerProp: 'self',
          options: {
            responsive: true
          }
        }
      })

      const testProps = { contollerProp: { mobile: 'tabletValue' } }

      expect(testStyler(testProps)).toEqual({
        '@media screen and (min-width:1BP_Test)': {
          testCSSProp: 'tabletValue',
          testCSSProp2: 'tabletValue'
        }
      })
    })
  })

  describe('Call built function by passing string to matcher', () => {
    it('Should lookup key Functions using "returnAsIs" ', () => {
      const testStyler = styler({
        testCSSProp: {
          testProp: 'returnAsIs',
          default: 'small'
        }
      })

      const testProps = {
        testProp: 'thisShouldBeReturned'
      }

      expect(testStyler(testProps)).toEqual({
        testCSSProp: 'thisShouldBeReturned'
      })
    })

    it('Should lookup key Functions using "identity" ', () => {
      const testStyler = styler({
        testCSSProp: {
          testProp: 'identity',
          default: 'small'
        }
      })

      const testProps = {
        testProp: 'thisShouldBeReturned'
      }

      expect(testStyler(testProps)).toEqual({
        testCSSProp: 'thisShouldBeReturned'
      })
    })

    it('Should lookup key Functions using "propValue" ', () => {
      const testStyler = styler({
        testCSSProp: {
          testProp: 'propValue',
          default: 'small'
        }
      })

      const testProps = {
        testProp: 'thisShouldBeReturned'
      }

      expect(testStyler(testProps)).toEqual({
        testCSSProp: 'thisShouldBeReturned'
      })
    })

    it('Should lookup key Functions using "self" ', () => {
      const testStyler = styler({
        testCSSProp: {
          testProp: 'self',
          default: 'small'
        }
      })

      const testProps = {
        testProp: 'thisShouldBeReturned'
      }

      expect(testStyler(testProps)).toEqual({
        testCSSProp: 'thisShouldBeReturned'
      })
    })

    StylerTest('Should lookup key Functions using "pxToRem"', {
      args: {
        testCSSProp: {
          testProp: 'pxToRem',
          default: 'small'
        }
      },
      props: {
        testProp: 16
      },
      result: {
        testCSSProp: '1rem'
      }
    })

    StylerTest('Should join Nested Selectors', {
      args: {
        '>:first-child': {
          '>*': {
            cssProp: 1
          }
        }
      },
      props: {
        column: { mobile: true, tablet: true },
        row: { mobile: true }
      },
      result: {
        '>:first-child >*': { cssProp: 1 }
      }
    })
  })

  describe('Strings on Matchers are responsive', () => {
    it('Should lookup key Functions using "returnAsIs', () => {
      const testStyler = styler({
        flexDirection: {
          flexDirection: 'returnAsIs',
          direction: 'returnAsIs',
          fxdirection: 'returnAsIs',
          row: 'row',
          column: 'column',
          rowReverse: 'row-reverse',
          columnReverse: 'column-reverse'
        }
      })

      const props = {
        column: { mobile: true, tablet: true },
        row: { mobile: true }
      }
      const res = { flexDirection: 'row' }

      expect(testStyler(props)).toEqual(res)
    })
    it('Should Works With Arrays', () => {
      const testStyler = styler({
        flexDirection: {
          flexDirection: 'returnAsIs',
          direction: 'returnAsIs',
          fxdirection: 'returnAsIs',
          row: 'row',
          column: 'column',
          rowReverse: 'row-reverse',
          columnReverse: 'column-reverse',
          options: { responsiveBool: true, transform: true }
        }
      })

      const props = {
        column: [true, true]
      }
      const res = {
        '@media screen and (min-width:1BP_Test)': { flexDirection: 'column' },
        flexDirection: 'column'
      }

      expect(testStyler(props)).toEqual(res)
    })
  })

  describe('Deeply Nested', () => {
    StylerTest('Nested inline Pattern within Block Pattern', {
      args: {
        __match: {
          variant: v => ({
            backgroundColor: {
              minimal: 'transparent',
              disabled: 'bg_disabled',
              main: v !== 'regular' ? `${v}D1` : 'blueD1',
              default: 'grayL4'
            },
            color: {
              disabled: 'gray',
              minimal: v !== 'regular' ? `${v}D1` : 'blueD1',
              main: 'white',
              default: v !== 'regular' ? `${v}D1` : 'grayD5'
            }
          })
        },

        '&:hover': {
          backgroundColor: {
            minimal: 'transparent',
            disabled: 'bg_disabled',
            main: (v, { variant }) =>
              variant !== 'regular' ? `${variant}D1` : 'blueD1',
            default: 'grayL4'
          }
        }
      },
      props: { variant: 'blue' },
      result: {
        '&:hover': { backgroundColor: 'grayL4' },
        backgroundColor: 'grayL4',
        color: 'blueD1'
      }
    })

    StylerTest('correctly reformats Result', {
      args: {
        '@media only screen and (max-width: 700px)': {
          '&:hover': { margin: '1px', color: 'red' }
        },
        '&:hover': {
          '@media only screen and (max-width: 700px)': {
            color: 'blue',
            '': { test: 'hey' }
          }
        }
      },
      props: {},
      result: {
        '@media only screen and (max-width: 700px)': {
          '&:hover': { color: 'blue', margin: '1px', test: 'hey' }
        }
      }
    })
  })

  describe('ComputeOptions', () => {
    // TODO BUG
    // StylerTest('If Theme Key is empty, searches root', {
    //   args: {
    //     options: { transformOptions: { key: 'theme' } },
    //     color: {
    //       color: v => `color_${v}`
    //     }
    //   },
    //   props: {
    //     color: 'black',
    //     theme: {
    //       color_blue: 'blueColor',
    //       color_black: 'blackColor',
    //       colors: { blue: 'Themedblue' }
    //     }
    //   },
    //   result: { color: 'blackColor' }
    // })

    StylerTest('Correctly Returns Negatives', {
      args: {
        marginTop: {
          default: '-.5rem'
        }
      },
      props: {},
      result: { marginTop: '-.5rem' }
    })
  })

  describe('Turn Off Default Getters and Lookups', () => {
    StylerTest('Doesnt Compute Global', {
      args: {
        options: {
          defaultTransform: false,
          defaultLookup: false
        },
        marginBottom: { default: '1px' },
        marginTop: { default: 'sm' }
      },
      props: { theme: { margin: '1px' } },
      result: { marginBottom: '1px', marginTop: 'sm' }
    })

    StylerTest('Doesnt Compute Local', {
      args: {
        marginBottom: {
          default: '1px',
          options: {
            defaultTransform: false,
            defaultLookup: false
          }
        },
        marginTop: {
          default: 'sm',
          options: {
            defaultTransform: false,
            defaultLookup: false
          }
        }
      },
      props: { theme: { margin: '1px' } },
      result: { marginBottom: '1px', marginTop: 'sm' }
    })
  })
})
