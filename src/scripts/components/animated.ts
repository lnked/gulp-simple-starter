import * as utils from '@utils/tik';

const Animated = (() => {
  let loaded = false;

  const fadeUps = document.querySelectorAll('.fade-up');

  let elements = [...Array.from(fadeUps)];

  const isElementInViewport = el => {
    if (typeof el === 'undefined') {
      return false;
    }

    const rect = el.getBoundingClientRect();

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    const vertInView = rect.top <= vh && rect.top + rect.height >= 0;
    const horInView = rect.left <= vw && rect.left + rect.width >= 0;

    return vertInView && horInView;
  };

  const reset = element => {
    element.classList.remove('fade-up');
  };

  const check = element => {
    if (isElementInViewport(element)) {
      reset(element);
      elements = elements.filter(item => item !== element);
    }
  };

  return {
    terminate: () => {
      loaded = true;
    },
    init: () => {
      utils.tik((lastScrollY, callback) => {
        elements.forEach(element => setTimeout(() => check(element), 16));

        if (!loaded) {
          callback();
        }

        if (!elements.length) {
          loaded = true;
        }
      });
    },
  };
})();

export default Animated;
