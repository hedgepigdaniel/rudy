export default (function (api) {
  var scrollRestorer = api.scrollRestorer;

  if (scrollRestorer) {
    return scrollRestorer.restoreScroll(api);
  }

  return function (_, next) {
    return next();
  };
});
//# sourceMappingURL=restoreScroll.js.map