const Navigation = (() => {
  const elements = document.querySelectorAll('.j-nav');

  const listener = function (event) {
    console.log({ event });
  };

  return {
    terminate: () => {
      elements.forEach(target => target.removeEventListener('click', listener, false));
    },
    init: () => {
      elements.forEach(target => target.addEventListener('click', listener, false));
    },
  };
})();

export default Navigation;
