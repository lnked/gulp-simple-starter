import { resolve } from 'path';
import imagemin from 'gulp-imagemin';
import imageminOptipng from 'imagemin-optipng';

import { getData } from './get-data';
import { cacheDirectory, development, production } from './env';

export const publicPath = 'public';
export const htmlPath = 'src/templates';
export const fontsPath = 'src/fonts';
export const imagesPath = 'src/images';
export const stylesPath = 'src/styles';
export const scriptsPath = 'src/scripts';
export const svgStorePath = 'src/svgstore';
export const manifestConfig = {
  merge: true,
};
export const svgStoreFile = `${publicPath}/_svgstore.html`;
export const manifestPath = resolve(cacheDirectory, 'rev-manifest.json');

export const htmlFormatConfig = {
  indent_size: 2,
  indent_char: ' ',
  brace_style: 'expand',
  end_with_newline: true,
  preserve_newlines: true,
  indent_handlebars: true,
  indent_inner_html: false,
  max_preserve_newlines: 1,
  unformatted: [
    'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'textarea',
    'pre', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen',
    'map', 'mark', 'math', 'meter', 'noscript', 'script',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
    'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
    'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
  ],
};

export const testsPatterns = [
  '**/__tests__/**/*.(j|t)s?(x)',
  '**/?(*.)+(spec|test).(j|t)s?(x)',
];

export const svgminConfig = (prefix) => ({
  plugins: [
    { sortAttrs: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeViewBox: false },
    { removeDoctype: true },
    { removeMetadata: true },
    { removeComments: true },
    { removeEmptyText: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeStyleElement: true },
    { removeEditorsNSData: true },
    { removeEmptyContainers: true },
    { removeUselessDefs: true },
    { removeXMLProcInst: true },
    { removeDimensions: true },
    { cleanupNumericValues: {
        floatPrecision: 2
    }},
    { cleanupIDs: {
        prefix: prefix + '-',
        minify: false
    }},
    { js2svg: {
        pretty: true
    }},
    { convertColors: {
        names2hex: true,
        rgb2hex: true
    }},
    { removeAttrs: {
        attrs: ["id", "class", "data-name", "stroke", "fill-rule"]
    } },
    { removeStyleElement: true },
    { removeScriptElement: true },
    { transformsWithOnePath: true },
    { removeUselessStrokeAndFill: true },
  ]
});

export const htmlminConfig = {
  minifyJS: true,
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  processConditionalComments: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

export const imageminConfig = [
  imagemin.gifsicle({
    interlaced: true,
    optimizationLevel: 3,
  }),
  imagemin.mozjpeg({
    interlaced: true,
    progressive: true,
  }),
  imagemin.optipng({
    optimizationLevel: 5,
  }, {
    use: imageminOptipng()
  }),
  imagemin.svgo({
    plugins: [
      { removeTitle: true },
      { removeDesc: true },
      { removeViewBox: false },
      { removeDoctype: true },
      { removeMetadata: true },
      { removeComments: true },
      { removeUselessDefs: true },
      { removeXMLProcInst: true },
      { removeDimensions: true },
      { removeStyleElement: true },
      { cleanupNumericValues: {
        floatPrecision: 2
      } },
      { removeAttrs: {
        attrs: ["id", "class", "data-name"]
      } },
      { sortAttrs: true },
      { cleanupIDs: true },
      { convertColors: {
        names2hex: true,
        rgb2hex: true
      } },
      { removeEmptyContainers: true },
      { removeUselessStrokeAndFill:false },
      { removeEmptyText: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeHiddenElems: true },
      { transformsWithOnePath: true },
    ],
  }),
];

export const pugConfig = (plugins) => ({
  plugins,
  data: getData(),
  basedir: [
    htmlPath,
    publicPath,
  ],
  debug: false,
  pretty: true,
  verbose: false,
});

export const nunjucksRenderConfig = {
  data: getData(),
  path: [
    htmlPath,
    publicPath,
  ],
  envOptions: {
    watch: development,
  },
};

export const webpConfig = {
  ...(production && {
    quality: 80,
    method: 6,
  } || {}),
};

export { environment } from './tools/env';
