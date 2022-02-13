import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import imagemin from 'gulp-imagemin';

import { cacheDirectory, development, templatesPath, production, env } from './env';

export const publicPath = 'public';
export const htmlPath = 'src/templates';
export const fontsPath = 'src/fonts';
export const imagesPath = 'src/images';
export const stylesPath = 'src/styles';
export const scriptsPath = 'src/scripts';
export const svgStorePath = 'src/svgstore';
export const sharedPath = 'src/shared';
export const transferPaths = ['src/mediadata'];
export const manifestPath = resolve(cacheDirectory, 'rev-manifest.json');

const {
  REV_NAME_ENABLED = false,
  GIF_OPTIMIZE = false,
  PNG_OPTIMIZE = false,
  JPG_OPTIMIZE = false,
  SVG_OPTIMIZE = false,
} = env;

export const checkManifestPath = () => {
  if (!existsSync(cacheDirectory)) {
    mkdirSync(cacheDirectory);
  }

  if (!existsSync(manifestPath)) {
    writeFileSync(manifestPath, '{}');
  }
};

export const manifestContents = () => {
  if (REV_NAME_ENABLED && existsSync(manifestPath)) {
    return readFileSync(manifestPath);
  }

  return {};
};

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
    'abbr',
    'area',
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'textarea',
    'pre',
    'code',
    'data',
    'datalist',
    'del',
    'dfn',
    'em',
    'embed',
    'i',
    'ins',
    'kbd',
    'keygen',
    'map',
    'mark',
    'math',
    'meter',
    'noscript',
    'script',
    'object',
    'output',
    'progress',
    'q',
    'ruby',
    's',
    'samp',
    'small',
    'strong',
    'sub',
    'sup',
    'template',
    'time',
    'u',
    'var',
    'wbr',
    'text',
    'acronym',
    'address',
    'big',
    'dt',
    'ins',
    'strike',
    'tt',
  ],
};

export const testsPatterns = ['**/__tests__/**/*.(j|t)s?(x)', '**/?(*.)+(spec|test).(j|t)s?(x)'];

const safelistClasses = ['fade', 'active', 'disabled', 'visible', 'hidden', 'animate', 'animated'];

export const purgeCSSConfig = {
  templates: [`/${templatesPath}/*.{njk,html}`, `/${templatesPath}/**/*.{njk,html}`],
  safelist: safelistClasses.map(name => [`.is-${name}`, `.${name}`]).flat(),
};

export const commonSVGO = [
  { sortAttrs: true },
  { removeDesc: true },
  { removeTitle: true },
  { removeDoctype: true },
  { removeViewBox: false },
  { removeMetadata: true },
  { removeComments: true },
  { removeEmptyText: true },
  { removeEmptyAttrs: true },
  { removeDimensions: true },
  { removeStyleElement: true },
  { removeUselessDefs: true },
  { removeXMLProcInst: true },
  {
    cleanupNumericValues: {
      floatPrecision: 2,
    },
  },
  {
    convertColors: {
      rgb2hex: true,
      names2hex: true,
    },
  },
];

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

export const scriptSizeConfig = {
  title: 'scripts',
  gzip: true,
  showFiles: true,
  showTotal: true,
};

export const gzipConfig = {
  threshold: 1024,
  gzipOptions: {
    level: 9,
    memLevel: 1,
    skipGrowingFiles: true,
  },
};

export const revOptions = {
  merge: true,
};
export const imageminConfig = [
  ...(GIF_OPTIMIZE && [
    imagemin.gifsicle({
      interlaced: true,
    }),
  ]),
  ...(JPG_OPTIMIZE && [
    imagemin.mozjpeg({
      quality: 85,
      progressive: true,
    }),
  ]),
  ...(PNG_OPTIMIZE && [
    imagemin.optipng({
      optimizationLevel: 5,
    }),
  ]),
  ...(SVG_OPTIMIZE && [
    imagemin.svgo({
      plugins: [
        ...commonSVGO,
        { cleanupIDs: false },
        { removeViewBox: false },
        { removeHiddenElems: true },
        { removeEditorsNSData: true },
        { removeEmptyContainers: true },
        { removeUselessStrokeAndFill: false },
      ],
    }),
  ]),
].filter(Boolean);

export const nunjucksRenderConfig = {
  ext: '.html',
  web: { async: true },
  path: [sharedPath, htmlPath, publicPath],
  envOptions: {
    watch: development,
  },
};

export const webpConfig = {
  ...((production && {
    lossless: true,
    quality: 50,
    method: 6,
  }) ||
    {}),
};
