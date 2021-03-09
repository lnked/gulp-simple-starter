import { series, parallel } from 'gulp';

export default mode =>
  series(['clean'], ['images'], parallel('styles', mode), parallel('templates', 'public', 'transfer', 'fonts'), [
    'critical',
  ]);
