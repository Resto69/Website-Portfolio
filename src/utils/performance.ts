export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const throttle = <F extends (...args: unknown[]) => unknown>(
  func: F,
  waitFor: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastRun = 0;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId) {
      return;
    }

    const now = Date.now();
    if (now - lastRun >= waitFor) {
      func.apply(this, args);
      lastRun = now;
    } else {
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastRun = Date.now();
        timeoutId = null;
      }, waitFor - (now - lastRun));
    }
  } as F;
};
