import SwitchProp from '../../src/switchP'
import responsiveProp from './responsiveProp'
import responsiveBoolProp from './responsiveBoolProp'
import transformStyle from './transformStyle'
import defaultLookups from './defaultLookups'

// responsiveProp,
//   responsiveBoolProp,
//   transformStyle,
//   mappedFunctions,
//   globalOptions

export default SwitchProp(
  responsiveProp,
  responsiveBoolProp,
  transformStyle,
  defaultLookups['functions']
)
