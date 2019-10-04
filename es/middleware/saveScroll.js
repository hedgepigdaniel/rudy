export default (function (api) {
  var scrollRestorer = api.scrollRestorer;

  if (scrollRestorer) {
    return scrollRestorer.saveScroll(api);
  }

  return function (_, next) {
    return next();
  };
});
//# sourceMappingURL=saveScroll.js.map