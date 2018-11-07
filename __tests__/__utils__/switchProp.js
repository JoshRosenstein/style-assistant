import {createSwitchP} from '../../src/switchP'
import responsiveP from './responsiveProp'
import responsiveBoolP from './responsiveBoolProp'
import transformStyleP from './transformStyle'
import defaultLookups from './defaultLookups'
import testDefaultConfig from './testDefaultConfig'
// responsiveProp,
//   responsiveBoolProp,
//   transformStyle,
//   mappedFunctions,
//   globalOptions

// export default SwitchProp(
//   responsiveProp,
//   responsiveBoolProp,
//   transformStyle,
//   defaultLookups.functions,
// )

export default createSwitchP(
  {
    responsiveP,
    responsiveBoolP,
    transformStyleP,
  },
  {
    ...testDefaultConfig,
    switchPOptions: {},
  },
)
