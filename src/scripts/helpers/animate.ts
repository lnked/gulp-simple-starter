const animateCircle = (circle) => {
  let timer;

  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = `${offset}`;
  }

  let i = 0;

  const progress = () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setProgress(i);
      i++;

      if (i <= 100) {
        progress();
      }
    }, 4);
  };

  setTimeout(() => {
    progress();
  }, 1000);
};

export const animate = () => {
  const circles = document.querySelectorAll('circle');

  circles.forEach((circle) => {
    animateCircle(circle);
  });
};
