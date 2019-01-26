import createTest from '../../__helpers__/createTest'

jest.mock('@respond-framework-test/rudy/src/utils/isHydrate', () => () => false)
jest.mock('@respond-framework-test/utils/cjs/isServer', () => () => false)

createTest('callbacks called on load if SPA', {
  FIRST: {
    path: '/first',
    beforeEnter() {},
    thunk: ({ dispatch }) => dispatch({ type: 'REDIRECTED' }),
  },
})
