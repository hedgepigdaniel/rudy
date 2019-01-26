// @flow
import { isServer } from '@respond-framework-test/utils'

export default (req: Object): boolean => {
  const { universal } = req.getLocation()
  return universal && !isServer() && req.getKind() === 'load'
}
