import test from 'components/test';
import scrollTarget from 'components/scroll-target';

window.onload = () => {
  test();

  scrollTarget({
    trigger: '.j-nav-link',
  });
};
