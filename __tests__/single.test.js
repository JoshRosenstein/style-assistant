import Assistant from '../src/index'

import testTheme from './__utils__/testThemeObj'
import config from './__utils__/testDefaultConfig'

const styler = new Assistant({ ...config, defaultTheme: testTheme })

describe('Parser', () => {
  it('Works ', () => {
    // log.getLogger('transformStyle').setLevel(0)
    const e = styler.parse({
      width: '1px'
    })({})

    const r = { width: '1px' }
    // log.getLogger('transformStyle').setLevel(3)
    expect(e).toEqual(r)
  })
  it('Works 2', () => {
    // log.getLogger('transformStyle').setLevel(0)
    const e = styler.parse({
      width: {
        w: v => v
      }
    })({ w: '1px' })

    const r = { width: '1px' }
    // log.getLogger('transformStyle').setLevel(3)
    expect(e).toEqual(r)
  })

  it('with MQ', () => {
    const e = styler.parse({
      mq_mobile__1: { border: 1 },
      mq_mobile__2: { borderTop__2: 2 }
    })({
      theme: { breakpoints: { mobile: 'mobile' } }
    })

    const r = {
      '@media screen and (min-width:mobile)': { border: 1, borderTop: 2 }
    }

    expect(e).toEqual(r)
  })
  // value: val,
  //   options: localOptions,
  //     cssProp,
  //     valueOnly
  it('transformStyle Default Transform', () => {
    const e = styler.transformStyle({
      value: 'sm',
      cssProp: 'margin'
    })({})

    const r = { margin: '0.5rem' }

    expect(e).toEqual(r)
  })

  it('SwitchProp transformStyle Default Transform', () => {
    const e = styler.switchP(
      {
        marginKey: 'self'
      },
      { cssProp: 'margin', transform: true }
    )({ marginKey: 'sm' })

    const r = { margin: '0.5rem' }

    expect(e).toEqual(r)
  })
  it('MQ Selector', () => {
    const e = styler.parse({
      mq_mobile: {
        marginTop: {
          margin: 'self',
          options: { transformOptions: {}, transform: true }
        }
      }
    })({ margin: '1px' })

    const r = {
      '@media screen and (min-width:1BP_Test)': { marginTop: '0.063rem' }
    }

    expect(e).toEqual(r)
  })
})

describe('Simple Match Boolean Execution', () => {
  const testStyler = styler.parse({
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

    const result1 = styler.parse(rules1)(props1)
    const result2 = styler.parse(rules1)(props2)
    const result3 = styler.parse(rules2)(props1)
    const result4 = styler.parse(rules2)(props2)
    expect(result1).toEqual(result2)
    expect(result3).toEqual(result4)
    expect(result1).not.toEqual(result3)
  })
})
