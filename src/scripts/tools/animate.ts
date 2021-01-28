const animate = (elem, style, unit, from, to, time, prop) => {
  if (!elem) {
    return;
  }

  const start = new Date().getTime();
  const timer = setInterval(() => {
    const step = Math.min(1, (new Date().getTime() - start) / time);

    if (prop) {
      elem[style] = from + step * (to - from) + unit;
    } else {
      elem.style[style] = from + step * (to - from) + unit;
    }
    if (step === 1) {
      clearInterval(timer);
    }
  }, 25);

  if (prop) {
    elem[style] = from + unit;
  } else {
    elem.style[style] = from + unit;
  }
};

export default animate;
