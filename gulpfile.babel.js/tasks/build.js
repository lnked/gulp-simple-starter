import { series, parallel } from 'gulp';

export default mode =>
  series(
    ['clean'],
    ['images'],
    parallel('styles', mode, 'svgstore'),
    parallel('templates', 'public', 'fonts'),
    ['critical'],
  );
