function animate(elem, style, unit, from, to, time, prop) {
  if (!elem) {
    return;
  }
  var start = new Date().getTime(),
    timer = setInterval(function () {
      let step = Math.min(1, (new Date().getTime() - start) / time);
      if (prop) {
        elem[style] = (from + step * (to - from)) + unit;
      } else {
        elem.style[style] = (from + step * (to - from)) + unit;
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
}

window.onload = function () {
  let elements = document.querySelectorAll('.nav-link');

  elements.forEach(item => {
    item.addEventListener('click', () => {
      let id = item.getAttribute('target');
      let target = document.getElementById(id);

      animate(
        document.scrollingElement || document.documentElement,
        'scrollTop',
        '',
        document.documentElement.scrollTop,
        target.offsetTop,
        200,
        true
      );
    });
  });

};

