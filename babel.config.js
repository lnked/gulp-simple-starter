module.exports = function (api) {
  // const test = api.env('test')
  // const production = api.env('production')
  // const development = api.env('development')
  api.cache(false);

  return {
    presets: [
      ['@babel/preset-env', {
        modules: false,
      }]
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread'],
    ],
    comments: false,
  }
}
