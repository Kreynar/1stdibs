function addSparkle() {

  // Changing var to const.
  const hash = decodeURIComponent(window.location.hash).split("#")[1] || [];
  return Array.from(hash).reduce((result, symbol) => {

    /* Radix - argument of 'toString' must be a number between 2 and 36.
    So it must be a special symbol, like '𐐷', that has length 2, not 1.
    At the end, if 'symbol' is '𐐷', then the following line will equal
    '(2).toString(2) == 10', which equals '"10" == 10'.*/
    if (symbol.length.toString(symbol.length) == 10) {
      result += symbol;
    }
    return result;
  }, "");

  // Unreachable code.
  return "";
}
