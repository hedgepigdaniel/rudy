// @flow
export const PREFIX = '@@rudy'
export const prefixType = (type: string) => `${PREFIX}/${type}`

export const UPDATE_HISTORY = prefixType('UPDATE_HISTORY')
export const CALL_HISTORY = prefixType('CALL_HISTORY')
export const NOT_FOUND = prefixType('NOT_FOUND')
export const ADD_ROUTES = prefixType('ADD_ROUTES')
export const CHANGE_BASENAME = prefixType('CHANGE_BASENAME')
export const CLEAR_CACHE = prefixType('CLEAR_CACHE')

export const CONFIRM = prefixType('CONFIRM')
export const BLOCK = '@@skiprudy/BLOCK' // these skip middleware pipeline, and are reducer-only
export const UNBLOCK = '@@skiprudy/UNBLOCK'
