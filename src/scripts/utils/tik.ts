export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

export const cancelAnimationFrame =
  window.cancelAnimationFrame || window.cancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
  window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
  window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame;

export const tik = (onUpdate) => {
  const loop = () => {
    onUpdate(window.pageYOffset, () => {
      requestAnimationFrame(loop);
    });
  }

  loop();
}
