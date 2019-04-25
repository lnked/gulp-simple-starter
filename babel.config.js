module.exports = function (api) {
  const development = api.env('development');

  return {
    presets: [
      ['@babel/preset-env', {
        modules: false,
      }],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread'],
    ],
    comments: development,
  }
}
