module.exports = [
  {
    path: ['(dist|output)/static/**/*.js', '(dist|output)/static/**/*.css'],
    webpack: false,
    gzip: true,
  },
];
