import imagemin from 'gulp-imagemin';
import imageminOptipng from 'imagemin-optipng';

export { environment } from './tools/env';

export const publicPath = 'public'
export const fontsPath = 'src/fonts'
export const imagesPath = 'src/images'
export const stylesPath = 'src/styles'
export const scriptsPath = 'src/scripts'
export const templatesPath = 'src/templates'
export const svgStorePath = 'src/svgstore'
export const svgStoreFile = `${publicPath}/_svgstore.html`
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
}
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
    { removeUselessStrokeAndFill: true }
  ]
})
export const htmlminConfig = {
  minifyJS: true,
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
  processConditionalComments: true
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
      {removeTitle:true},
      {removeDesc:true},
      {removeViewBox:false},
      {removeDoctype:true},
      {removeMetadata:true},
      {removeComments:true},
      {removeUselessDefs:true},
      {removeXMLProcInst:true},
      {removeDimensions:true},
      {cleanupNumericValues: {
        floatPrecision: 2
      }},
      {cleanupIDs:true},
      {convertColors: {
        names2hex: true,
        rgb2hex: true
      }},
      {removeUselessStrokeAndFill:false},
    ],
  }),
]
