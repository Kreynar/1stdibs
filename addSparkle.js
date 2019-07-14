function addSparkle() {
  var hash = decodeURIComponent(window.location.hash).split("#")[1] || [];
  return Array.from(hash).reduce((result, symbol) => {
    if (symbol.length.toString(symbol.length) == 10) {
      result += symbol;
    }
    return result;
  }, "");
  return "";
}
