// @flow
import {objOf, mapValues, defaultTo, isPopulated} from '@roseys/futils'

// export let sizes = {
//   mobile: 599,
//   tablet: 768,
//   desktop: 1200,
//   hd: 1800
// }

// toMq({ screen: true, min: 1500 })
// export let sizes2 = [599, 768, 1200, 1800]
// const toMq = s => `@media (min-width: ${s / 16}em)`
export default (sizes, toMQ) =>
  sizes &&
  mapValues(v => (styles, overide = () => null) =>
    isPopulated(styles)
      ? objOf(toMQ(defaultTo({screen: true, min: v}, overide(v))), {
          ...styles,
        })
      : {},
  )(sizes)

// return mapValues(v => objOf(toMq(v)))(sizes)

// const media = Media(sizes, toMq)
// const media2 = Media(sizes2, toMq)
// console.log(media.mobile({ a: 1 }))
// console.log(media2[3]({ a: 1 }))
