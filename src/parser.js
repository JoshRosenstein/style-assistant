import {
  isNil,
  merge,
  is,
  keys,
  reduce,
  isEmpty,
  last,
  always,
  pipe,
  mergeDeepRight,
  ifElse,
  prop,
  flow,
  toArray,
  isObject,
  pathOr,
  objOf,
  when
} from '@roseys/futils'

import {
  whenFunctionCallWith,
  falseToNull,
  splitSelectors,
  isAtRule,
  isTruthy,
  isMQ,
  isTemplate,
  extractTemplateValue
} from './utils'


export const PSUEDO_WITHOUT_SELECTOR = /(^|\s)(:{1,2})(\w)/g
export const REFERENCE_SELECTOR = /&/g

export const isNestableAtRule = selector =>
  /@\S*\b(media|supports|keyframes)\b/.test(selector)

export const containsSpecial = str =>
  /[~`!@#$%\^&*+=\-\[\]\\';.,/{}|\\":<>\?\s]/g.test(str) // eslint-disable-line no-useless-escape

export const hasReference = selector => selector.indexOf('&') !== -1

export const isNestable = selector =>
  isAtRule(selector) && isNestableAtRule(selector)

const reduceRule = (rules, result) =>
  reduce(
    (style, rule) => {
      if (isNil(rule.value)) {
        return style
      }
      if (rule.value === '' && rule.property !== 'content') {
        rule.value = undefined
      }
      // / For Nested selectors
      const location = rule.location.concat(rule.selectors.join(', '))
      location.reduce((style, selector, i, arr) => {
        selector = selector.trim()
        if (!selector) {
          if (rule.property === '@font-face') {
            style[rule.property] = style[rule.property]
              ? toArray(style[rule.property]).concat(rule.value)
              : rule.value
          } else {
            style[rule.property] = rule.value
          }
          return style
        }
        const r = {}
        if (i === arr.length - 1) {
          r[rule.property] = rule.value
        }
        style[selector] = merge(style[selector] || {}, r)
        return style[selector]
      }, style)
      // return style[selector]
      return style
    },
    result,
    rules
  )

const formatOutput = grouped =>
  reduce((result, rules) => reduceRule(rules, result), {}, grouped)

const isPatternBlock = key => key === '__match'

const isInlinePattern = (value, selector, location) =>
  isObject(value) &&
  !isEmpty(value) &&
  !containsSpecial(selector) &&
  !isEmpty(selector) &&
  !isNestable(last(location) || []) &&
  !isPatternBlock(selector)

const parseRulesC = (parseInlinePattern, toMq) => (
  parseNested,
  selector,
  value,
  parents,
  location,
  props,
  options
) => {
  selector = selector.replace(/__.$/, '')
  let next = selector
  value = flow(
    value,
    whenFunctionCallWith(props),
    falseToNull,
    when(isTemplate, template => objOf(extractTemplateValue(template), 'self'))
  )

  if (parents.length) {
    next = next.replace(PSUEDO_WITHOUT_SELECTOR, '$1&$2$3')
    if (hasReference(next)) {
      next = next.replace(REFERENCE_SELECTOR, parents.pop())
    }
  }
  if (selector === '@font-face') {
    return { location: [], selector: '', property: selector, value }
  }

  if (isMQ(selector)) {
    const bp = selector.replace(/^MQ_|mq_+/, '')
    selector = flow(
      pathOr(
        bp,
        ['theme', 'breakpoints', selector.replace(/^MQ_|mq_+/, '')],
        props
      ),
      toMq
    )
  }

  if (isPatternBlock(selector)) {
    const res = flow(
      value,
      reduce(
        (accumulated, rulesForProp, propName) =>
          flow(
            props,
            ifElse(
              x => isTruthy(prop(propName, x)),
              pipe(
                always(rulesForProp),
                whenFunctionCallWith(props[propName], props),
                whenFunctionCallWith(props),
                mergeDeepRight(accumulated)
              ),
              always(accumulated)
            )
          ),
        {}
      )
    )

    return parseNested(res, parents, location)
  }


  if (isInlinePattern(value, selector, parents)) {
    value = parseInlinePattern(value, {
      cssProp: selector,
      valueOnly: true,
      options
    })(props)
    // return parseNested(value, parents, location);
    if (isObject(value)) {
      return parseNested(value, parents, location)
    }
  }

  if (isObject(value)) {
    const nestable = isNestable(selector)
    if (nestable) {
      location = location.concat(selector)
    } else if (isAtRule(selector)) {
      parents = [next]
      location = []
    } else if (
      location.length &&
      isNestable(location[location.length - 1]) &&
      location[location.length - 1].indexOf(' ') === -1
    ) {
      location[location.length - 1] += ` ${selector}`
    } else {
      parents = parents.concat(next)
    }

    return parseNested(value, parents, location)
  }
  // value = computeGetter({ val: value, options, selector, props });

  return {
    location,
    selector: parents.join(' '),
    property: selector,
    value
  }
}

const groupRules = (group = true) => rules => {
  const idFn = (property, selector, value, i) => {
    if (group) {
      return (
        property +
        (selector === '' ? 'root' : '') +
        (typeof value !== 'object' ? value : `__${i}`)
      )
    }
    return selector + property + (typeof value !== 'object' ? value : `__${i}`)
  }

  return reduce(
    (grouped, rule, i) => {
      const id = idFn(rule.property, rule.selector, rule.value, i)

      if (!grouped[rule.location]) {
        grouped[rule.location] = {}
      }

      if (!grouped[rule.location][id]) {
        grouped[rule.location][id] = {
          location: rule.location,
          selectors: rule.selector ? [rule.selector] : [],
          property: rule.property,
          value: rule.value
        }
      } else if (rule.selector) {
        grouped[rule.location][id].selectors.push(rule.selector)
      }
      return grouped
    },
    {},
    rules
  )
}

export function getRulesC(
  switchProp,
  responsiveProp,
  responsiveBoolProp,
  toMq
) {
  const parseRules = parseRulesC(switchProp, toMq)
  return function getRules({
    obj,
    parents = [],
    location = [],
    props,
    options = {}
  }) {
    if (is('Function')(obj)) {
      obj = obj(props)
    }

    const { options: globalOptions, ...rules } = obj
    options = { ...options, ...globalOptions }
    const getNested = (givenObj, givenParents, givenLocation) =>
      getRules({
        obj: givenObj,
        parents: givenParents,
        location: givenLocation,
        options,
        props
      })


    return pipe(
      keys,
      reduce(
        (result, selectors) =>
          pipe(
            splitSelectors,
            reduce((res, selector) => {
              const parsed = parseRules(
                getNested,
                selector,
                rules[selectors],
                parents.slice(),
                location.slice(),
                props,
                options
              )

              return res.concat(parsed)
            }, result)
          )(selectors),
        []
      )
    )(obj)
  }
}

export default function stylerC(
  switchProp,
  responsiveProp,
  responsiveBoolProp,
  toMq
) {
  // //////Start Styler
  const getRules = getRulesC(
    switchProp,
    responsiveProp,
    responsiveBoolProp,
    toMq
  )
  return function stylerProp(obj, groupSelectors = true) {
    return function styler(props) {
      let rules
      if (is('Function')(obj)) {
        return stylerProp(obj(props))(props)
      }
      if (Array.isArray(obj)) {
        rules = obj.reduce((r, o) => r.concat(getRules({ obj: o, props })), [])
      } else {
        // return obj
        rules = getRules({ obj, props })
      }

      return flow(
        rules,
        groupRules(groupSelectors),
        formatOutput
      )
    }
  }
}