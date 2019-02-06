export const cssTimeToMs = cssTime => {
  const num = parseFloat(cssTime, 10);
  let unit = cssTime.match(/m?s/);
  let milliseconds;

  if (unit) {
    unit = unit[0];
  }

  switch (unit) {
    case "s":
      milliseconds = num * 1000;
      break;
    case "ms":
      milliseconds = num;
      break;
    default:
      milliseconds = 0;
      break;
  }

  return milliseconds;
};
