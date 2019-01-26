import createTest from '../../__helpers__/createTest'

jest.mock('@respond-framework-test/rudy/src/utils/isHydrate', () => () => true)
jest.mock('@respond-framework-test/utils/cjs/isServer', () => () => false)

createTest('beforeEnter + thunk callbacks NOT called if isHydrate', {
  FIRST: {
    path: '/first',
    beforeLeave() {},
    beforeEnter() {},
    onEnter() {},
    onLeave() {},
    thunk() {},
    onComplete() {},
  },
})
