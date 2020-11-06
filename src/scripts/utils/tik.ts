declare global {
  interface Window {
    mozRequestAnimationFrame: any;
    msRequestAnimationFrame: any;
    oRequestAnimationFrame: any;
  }
}

export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export const tik = onUpdate => {
  const loop = () => {
    onUpdate(window.pageYOffset, () => {
      requestAnimationFrame(loop);
    });
  };

  loop();
};
