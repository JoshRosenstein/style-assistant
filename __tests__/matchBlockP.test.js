import {matchBlockP} from '../src/matchBlockP'
import getTheme from './__utils__/getTheme'
import getThemeP from './__utils__/getThemeP'
import switchProp from './__utils__/switchProp'

describe('matchBlockP', () => {
  const basic = {
    color: 'blue',
    fontSize: 2,
  }
  const canReturnArray = size => [{height: `${getTheme(['space', size])}px`}]
  const funcOuterAndInner = c => ({
    color: props => getThemeP(['colors', c])(props) || c,
  })
  const ArrayWithFuncs = bg => [
    {backgroundColor: bg},
    switchProp(
      {
        secondary: v => v,
        default: 'defaultValue',
      },
      {
        cssProp: 'marginTop',
        transform: true,
        responsive: true,
      },
    ),
    {color: 'yellow'},
  ]

  const switchConfig = {
    basic,
    canReturnArray,
    color: funcOuterAndInner,
    bg: ArrayWithFuncs,
  }

  test('Basic', () => {
    const switchConfig = {
      basic: {
        color: 'blue',
        fontSize: 2,
      },
      unknownProp: {
        color: 'red',
        fontSize: 8,
      },
    }

    const props = {
      basic: true,
    }
    const res = {color: 'blue', fontSize: 2}

    expect(matchBlockP(switchConfig)(props)).toEqual(res)
  })

  test('canReturn Single Array', () => {
    const props = {
      canReturnArray: 'sm',
    }
    const res = {height: '8px'}

    expect(matchBlockP(switchConfig)(props)).toEqual(res)
  })
  test('funcOuterAndInner', () => {
    const props = {
      color: 'red',
      theme: {colors: {red: 'mycustomRed'}},
    }
    const res = {color: 'mycustomRed'}

    expect(matchBlockP(switchConfig)(props)).toEqual(res)
  })

  test('All', () => {
    const props = {
      basic: true,
      color: 'red',
      bg: 'green',
      secondary: [1, 2],
      canReturnArray: 'sm',
    }
    const res = {
      '@media screen and (min-width:1BP_Test)': {marginTop: '0.125rem'},
      backgroundColor: 'green',
      color: 'yellow',
      fontSize: 2,
      height: '8px',
      marginTop: '0.063rem',
    }
    expect(matchBlockP(switchConfig)(props)).toEqual(res)
  })

  // /combos
  // test('Basic', () => {

  //   const Type = matchBlockP({
  //     type:{color:'red'}})

  //   const a = matchBlockP({
  //     variant: Type,

  //   })
  //   const props = {
  //     basic: true,
  //     variant:'red',
  //     type:'default'

  //   }
  //   const res = { "color": "red" }
  //   expect(a(props)).toEqual(res)
  // })
})
