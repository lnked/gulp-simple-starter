export const convertMiliseconds = (miliseconds: number, format: string) => {
  const totalSeconds = Math.floor(miliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  switch (format) {
    case 's':
      return totalSeconds;
    case 'm':
      return totalMinutes;
    case 'h':
      return totalHours;
    case 'd':
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
};
