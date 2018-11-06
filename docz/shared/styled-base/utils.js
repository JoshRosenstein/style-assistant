// @flow
import * as React from 'react'
import isPropValid from '@emotion/is-prop-valid'
import {shouldForwardProp} from '@roseys/clean-props-by-tag'
export type Interpolations = Array<any>

const testOmitPropsOnStringTag: (key: string) => boolean = isPropValid
const testOmitPropsOnComponent = (asEnabled: boolean) => (key: string) =>
  key !== 'theme' && key !== 'innerRef' && asEnabled ? key !== 'as' : true
export const testAlwaysTrue = () => true

export const getShouldForwardProp = (tag, asEnabled) =>
  typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96
    ? key => shouldForwardProp(tag, key)
    : testOmitPropsOnComponent(asEnabled)

export const pickAssign: (
  testFn: (key: string) => boolean,
  target: {},
  ...sources: Array<{}>
) => Object = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: string => boolean,
  target?: string,
}

type CreateStyledComponent = (...args: Interpolations) => *

type BaseCreateStyled = (
  tag: React.ElementType,
  options?: StyledOptions,
) => CreateStyledComponent

export type CreateStyled = BaseCreateStyled & {
  [key: string]: CreateStyledComponent,
}
