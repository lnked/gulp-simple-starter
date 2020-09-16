import cssnano from 'cssnano';
import MQPacker from 'css-mqpacker';
import sortCSSmq from 'sort-css-media-queries';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import uncss from'postcss-uncss';
import animation from 'postcss-animation';
import position from 'postcss-position';
import immutableCss from 'immutable-css';
import postcssFixes from 'postcss-fixes';
import reporter from 'postcss-reporter';
import postcssShortSpacing from 'postcss-short-spacing';
import postcss100vhFix from 'postcss-100vh-fix';
import pseudoelements from 'postcss-pseudoelements';

import { isUncss, outputFolder, production } from './env';

export const postCSSCallback = file => ({
  plugins: [
    atImport({ root: file.dirname }),
    MQPacker({ sort: sortCSSmq }),
    postcssFixes({ preset: 'safe' }),
    immutableCss({ verbose: false }),
    postcssShortSpacing(),
    position(),
    animation(),
    ...(isUncss ? [
      uncss({
        html: [`${outputFolder}/**/*.html`],
        ignore: [
          '.fade',
          '.active',
          '.disabled',
          '.visible',
          '.hidden',
        ]
      })
    ] : []),
    ...(production ? [
      pseudoelements({
        single: true,
        selectors: [
          'hover',
          'focus',
          'active',
          'after',
          'ms-expand',
          'not',
          'first-child',
          'last-child'
        ],
      }),
      pseudoelements({
        single: false,
        selectors: ['before', 'after', 'first-letter', 'first-line'],
      }),
      postcss100vhFix(),
      autoprefixer({
        cascade: false,
      }),
      cssnano(),
    ] : []),
    reporter({
      clearMessages: true,
      throwError: false,
    }),
  ],
});
