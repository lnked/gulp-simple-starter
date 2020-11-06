import glob from 'glob';
import SVGO from 'svgo-sync';
import { readFileSync } from 'fs';
import { resolve, parse } from 'path';

import { svgStorePath } from '../config';

const svgo = new SVGO({
  plugins: [
    { removeXMLNS: true },
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeAttrs: { attrs: '(stroke|fill)' },
    },
  ],
});

const fixContent = (content, name) => content.replace('<svg ', `<symbol id="${name}" `).replace('</svg>', '</symbol>');

const getSymbols = () => {
  const files = glob.sync(`${svgStorePath}/**/*.svg`);

  const symbols = [];

  files.forEach(filename => {
    const contents = readFileSync(resolve(filename), 'utf8');
    const { name } = parse(filename);
    const { data } = svgo.optimizeSync(contents);

    symbols.push(fixContent(data, name));
  });

  return symbols;
};

export const parseSVGStore = () => {
  const symbols = getSymbols();

  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden;"><defs>${symbols.join(
    '',
  )}</defs></svg>`;
};
