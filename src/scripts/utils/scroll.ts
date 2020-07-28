export const scroll = function (handleUpdate) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  function loop () {
    handleUpdate(window.pageYOffset, () => {
      requestAnimationFrame(loop);
    });
  }

  loop();
}
