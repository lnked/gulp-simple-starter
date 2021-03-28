const animate = (elem, style, unit, from, to, time, prop) => {
  if (!elem) {
    return;
  }

  const start = new Date().getTime();
  const timer = setInterval(() => {
    const step = Math.min(1, (new Date().getTime() - start) / time);
    const firstStyle = from + step * (to - from) + unit;

    if (prop) {
      elem[style] = firstStyle;
    } else {
      elem.style[style] = firstStyle;
    }
    if (step === 1) {
      clearInterval(timer);
    }
  }, 25);

  const secondStyle = from + unit;

  if (prop) {
    elem[style] = secondStyle;
  } else {
    elem.style[style] = secondStyle;
  }
};

export default animate;
