import precss from 'precss';
import cssnano from 'cssnano';
import MQPacker from 'css-mqpacker';
import sortCSSmq from 'sort-css-media-queries';
import uncss from 'postcss-uncss';
import animation from 'postcss-animation';
import position from 'postcss-position';
import immutableCss from 'immutable-css';
import postcssFixes from 'postcss-fixes';
import postcssShortSpacing from 'postcss-short-spacing';
import pseudoelements from 'postcss-pseudoelements';

import { isUncss, outputFolder, production } from './env';

export const postCSSCallback = file => ({
  plugins: [
    precss(),
    MQPacker({ sort: sortCSSmq }),
    postcssFixes({ preset: 'safe' }),
    immutableCss({ verbose: false }),
    postcssShortSpacing(),
    position(),
    animation(),
    ...(isUncss && [
      uncss({
        html: [`${outputFolder}/**/*.html`],
        ignore: ['.fade', '.active', '.disabled', '.visible', '.hidden'],
      }),
    ]),
    ...(production && [
      pseudoelements({
        single: true,
        selectors: ['hover', 'focus', 'active', 'after', 'ms-expand', 'not', 'first-child', 'last-child'],
      }),
      pseudoelements({
        single: false,
        selectors: ['before', 'after', 'first-letter', 'first-line'],
      }),
      cssnano(),
    ]),
  ].filter(Boolean),
});
