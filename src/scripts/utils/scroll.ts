// export const scroll = function (handleUpdate) {
//   let lastScrollY = 0;
//   let ticking = false;

//   const update = function () {
//     handleUpdate(lastScrollY);
//     ticking = false;
//   };

//   const requestTick = function () {
//     if (!ticking) {
//       window.requestAnimationFrame(update);
//       ticking = true;
//     }
//   };

//   const onScroll = function () {
//     lastScrollY = window.scrollY;
//     requestTick();
//   };

//   window.addEventListener('scroll', onScroll);
// };

export const scroll = function (handleUpdate) {
  const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){window.setTimeout(callback, 1000/60)};

  function loop () {
    handleUpdate(window.pageYOffset, () => {
      requestAnimationFrame(loop);
    });
  }

  loop();
}

// let loaded = false;
// utils.scroll((lastScrollY, callback) => {
//   if (!loaded) {
//     callback();
//   }

//   if (!loaded && (lastScrollY >= loadTriggerOffset)) {
//     loaded = true;
//     Maps.init();
//   }
// });
