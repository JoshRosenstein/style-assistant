// @flow
import {path} from '@roseys/futils'
import {IDKEY, ISSTANDALONEKEY} from '../constants'
import {ASSISTANTID} from './constants'
import type {CreateGetDefaultThemeT} from './types'

const createGetDefaultTheme: CreateGetDefaultThemeT = ({defaultTheme}) => key =>
  path(key, defaultTheme)

createGetDefaultTheme[IDKEY] = ASSISTANTID
createGetDefaultTheme[ISSTANDALONEKEY] = true

export default createGetDefaultTheme
