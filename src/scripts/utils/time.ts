export const convertMiliseconds = (miliseconds, format) => {
  const total_seconds = parseInt(Math.floor(miliseconds / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours   = parseInt(Math.floor(total_minutes / 60));
  const days          = parseInt(Math.floor(total_hours / 24));

  const hours   = parseInt(total_hours % 24);
  const minutes = parseInt(total_minutes % 60);
  const seconds = parseInt(total_seconds % 60);

  switch(format) {
  case 's':
    return total_seconds;
  case 'm':
    return total_minutes;
  case 'h':
    return total_hours;
  case 'd':
    return days;
  default:
    return { d: days, h: hours, m: minutes, s: seconds };
  }
};
