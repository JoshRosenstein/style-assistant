import {prop, flow} from '@roseys/futils'
import {IDKEY} from '../constants'
import {ASSISTANTID, OPTIONSKEY} from './constants'
import {parseRulesC, getRulesC, groupRules, formatOutput} from './core'
import {isFunction} from 'typed-is'
import getAndCheckMethod from '../shared/getAndCheckMethod'
import {ASSISTANTID as RESPONSIVEP} from '../responsiveP/constants'
import {ASSISTANTID as TOMQ} from '../toMq/constants'
import {ASSISTANTID as SWITCHP} from '../switchP/constants'
import {ASSISTANTID as GETBREAKPOINTSP} from '../getBreakpointsP/constants'
import {isMQ} from '../utils'

const getDeps = getAndCheckMethod(ASSISTANTID)

/**
 * @requires switchP
 * @requires toMq
 * @requires breakpointsP
 * @requires responsiveP
 */

const createParse = (methods, options) => {
  let switchProp = getDeps(SWITCHP, methods)
  let toMq = getDeps(TOMQ, methods)
  let breakpointsP = getDeps(GETBREAKPOINTSP, methods)
  let responsiveP = getDeps(RESPONSIVEP, methods)
  let config = prop(OPTIONSKEY, options)

  const initSelectorTransform = (selector, props) => {
    // / Duplicate overidable keys
    selector = selector.replace(/__.$/, '')
    // / Check if Selector is MQ shorthand MQ_mobile || mq_1
    if (isMQ(selector)) {
      const bp = selector.replace(/^MQ_|mq_+/, '')
      selector = toMq(breakpointsP(bp)(props) || bp)
    }
    return selector
  }

  const parseRules = parseRulesC(
    switchProp,
    initSelectorTransform,
    responsiveP,
    breakpointsP,
  )

  // //////Start Styler
  const getRules = getRulesC(parseRules, config)
  return function stylerProp(obj, groupSelectors = true) {
    return function styler(props) {
      let rules
      if (isFunction(obj)) {
        return stylerProp(obj(props))(props)
      }
      if (Array.isArray(obj)) {
        rules = obj.reduce((r, o) => r.concat(getRules({obj: o, props})), [])
      } else {
        // return obj
        rules = getRules({obj, props})
      }

      return flow(
        rules,
        groupRules(groupSelectors),
        formatOutput,
        //  cleanAndSort
      )
    }
  }
}

createParse[IDKEY] = ASSISTANTID

export default createParse
