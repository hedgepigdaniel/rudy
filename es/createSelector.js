// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (function (name, selector) {
  if (typeof selector === 'function') {
    return selector;
  }

  if (selector) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (state) {
      return state ? state[selector] : undefined;
    };
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return function (state) {
    return state ? state[name] : undefined;
  };
});
//# sourceMappingURL=createSelector.js.map