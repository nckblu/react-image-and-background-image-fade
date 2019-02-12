export const FAIL_SRC = "FAIL_SRC";
export const SLOW_SRC = "SLOW_SRC";
export const simplePreloadMock = jest.fn(src => {
  if (src === FAIL_SRC) {
    return Promise.reject(src);
  } else if (src === SLOW_SRC) {
    setTimeout(() => {
      return Promise.resolve(src);
    }, 1000);
  } else {
    return Promise.resolve(src);
  }
});
