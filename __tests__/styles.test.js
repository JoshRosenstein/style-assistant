import { space , Box} from './__utils__/styleExamples'

describe('Styles', () => {

  it('[space] margin', () => {
    expect(space({ m: 0 })).toEqual({ margin: '0px' })
    expect(space({ margin: 0 })).toEqual({ margin: '0px' })

    expect(space({ m: 16 })).toEqual({ margin: '16px' })
    expect(space({ margin: 16 })).toEqual({ margin: '16px' })

    expect(space({ m: [0, 16] })).toEqual({
      '@media screen and (min-width:40em)': {
        margin: '16px'
      },
      margin: '0px'
    })

    expect(space({ m: {default:0,tablet:16} })).toEqual({
      '@media screen and (min-width:40em)': {
        margin: '16px'
      },
      margin: '0px'
    })

  })

  it('[space] padding', () => {
    expect(space({ p: 0 })).toEqual({ padding: '0px' })
    expect(space({ padding: 0 })).toEqual({ padding: '0px' })

    expect(space({ p: 16 })).toEqual({ padding: '16px' })
    expect(space({ padding: 16 })).toEqual({ padding: '16px' })

    expect(space({ p: [0, 16] })).toEqual({
      '@media screen and (min-width:40em)': {
        padding: '16px'
      },
      padding: '0px'
    })
  
    expect(space({ p: {default:0,tablet:16} })).toEqual({
      '@media screen and (min-width:40em)': {
        padding: '16px'
      },
      padding: '0px'
    })

  })

  describe('Box', () => {
    test('[Box] has no default', () => {
      expect(Box({})).toEqual({})
    })
    test('[Box] can use Themed Box', () => {
      expect(Box({theme:{'Box':{color:'red'} }})).toEqual({color:'red'})
    })

    test('[Box] can use cssProp', () => {
      expect(Box({css:{color:'red' }})).toEqual({color:'red'})
    })

    test('[Box][width]', () => {
      expect(Box({width:1})).toEqual({width:'100%'})
    })

    test('[Box][width]-Responsive Array', () => {
      expect(Box({width:[1,.5,.5]})).toEqual({ width: '100%',
        '@media screen and (min-width:40em)': { width: '50%' },
        '@media screen and (min-width:52em)': { width: '50%' } })
    })

    test('[Box][width]-Responsive Object', () => {
      expect(Box({width:{default:1, tablet:.5 , laptop:.5}})).toEqual({ width: '100%',
        '@media screen and (min-width:40em)': { width: '50%' },
        '@media screen and (min-width:52em)': { width: '50%' } })
    })

    test('[Box][justifySelf]', () => {
      expect(Box({justifySelf:'center'})).toEqual({ justifySelf: 'center' })
    })

    test('[Box][alignSelf]', () => {
      expect(Box({alignSelf:'center'})).toEqual({ alignSelf: 'center' })
    })

    test('[Box][order]', () => {
      expect(Box({order:1})).toEqual({ order: 1 })
    })

    test('[Box][color]', () => {
      expect(Box({bg:'blue',color:'red'})).toEqual({ backgroundColor: 'blue',color:'red' })
    })

    test('[Box][color]-Responsive Array', () => {
      expect(Box({bg:[undefined,'blue'],color:['red','white']})).toEqual({'@media screen and (min-width:40em)': {'backgroundColor': 'blue', 'color': 'white'}, 'color': 'red'})
    })

    test('[Box][color]-Responsive Object', () => {
      expect(Box({bg:{tablet:'blue'},color:{default:'red' ,tablet:'white'}})).toEqual({'@media screen and (min-width:40em)': {'backgroundColor': 'blue', 'color': 'white'}, 'color': 'red'})
    })
  })

})
