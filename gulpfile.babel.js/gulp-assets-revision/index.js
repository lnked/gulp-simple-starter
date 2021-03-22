// const { assign } = require('lodash');
import { assign } from 'lodash';

const crypto = require('crypto');
const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');

//Private Helpers
// var transform = function transform(file, nameTransformer, hasher) {

//     //Save original path and base
//     file.revisionOldPath = file.path;
//     file.revisionOldBase = file.base;

//     //Generate a hash
//     file.revisionHash = hasher(file);

//     if (typeof file.revisionHash !== 'string') {
//         throw 'Hasher didn\'t return a string.';
//     }

//     //Transform the filename
//     var filename = nameTransformer(file, file.revisionHash);

//     if (typeof filename !== 'string') {
//         throw 'Name transformer didn\'t return a string.';
//     }

//     //Set the new path
//     file.path = path.join(path.dirname(file.path), filename);

// };

// var relPath = function relPath(base, filePath) {

//     base = path.resolve(base);
//     filePath = path.resolve(filePath);

//     if (filePath.indexOf(base) !== 0) {
//         return filePath.replace(/\\/g, '/');
//     }

//     var newPath = filePath.substr(base.length).replace(/\\/g, '/');

//     if (newPath[0] === '/') {
//         return newPath.substr(1);
//     }

//     return newPath;
// };

//The plugin
const revision = (options) => {
  options = assign({
    // transformer: revision.defaultTransformer,
    // hasher: revision.md5Hasher
  }, options);

  console.log('revision: ', { options });

  // //Check options
  // if (options.transformer && typeof options.transformer !== 'function') {
  //     throw 'Option "nameTransformer" must be a function.';
  // }

  // if (options.hasher && typeof options.hasher !== 'function') {
  //     throw 'Option "hasher" must be a function.';
  // }

  // //Initialize the hash storage
  // const hashes = {};

  return function (file, enc, cb) {
    cb();
  }

  // return through.obj(function (file, enc, cb) {
  //     if (file.isNull()) {
  //         cb(null, file);

  //         return;
  //     }

  //     if (file.isStream()) {
  //         cb(new gutil.PluginError('gulp-revision', 'Streaming is not supported.'));

  //         return;
  //     }

  //     //Transform the file name
  //     try {
  //         transform(file, options.transformer, options.hasher);
  //     } catch (error) {
  //         cb(new gutil.PluginError('gulp-revision', error));

  //         return;
  //     }

  //     //Store the hash
  //     hashes[file.revisionOldPath] = file.revisionHash;

  //     //Mark it as revisioned
  //     file.revisioned = true;

  //     cb(null, file);

  // }, function (cb) {
  //     cb();
  // });
};

//The manifestor
revision.manifest = function (options) {
  options = assign({
    path: 'assets-manifest.json',
  }, options);

  console.log('manifest: ', { options });

  // //???
  // var firstFile = null;

  // //Initialize the manifest
  // const manifest  = {};

  // return through.obj(function (file, enc, cb) {

  //     //Only use revisioned files
  //     if (!file.revisioned) {
  //         cb();

  //         return;
  //     }

  //     //???
  //     firstFile = firstFile || file;

  //     //Add the file to the manifest
  //     manifest[relPath(firstFile.revisionOldBase, file.revisionOldPath)] = relPath(firstFile.base, file.path);

  //     cb();

  // }, function (cb) {

  //     //Is there anything to manifest?
  //     if (!_.size(manifest)) {
  //         cb();

  //         return;
  //     }

  //     //Create a new file
  //     var manifestFile = new gutil.File(options);

  //     //Put manifest in it
  //     manifestFile.contents = new Buffer(JSON.stringify(manifest, null, '    '));

  //     //Push it to the list
  //     this.push(manifestFile);

  //     cb();
  // });
};

// //Helpers
// revision.md5Hasher = function (file) {

//     // MD5 the file contents
//     const hash = crypto.createHash('md5').update(file.contents).digest('hex');

//     return hash;

// };

// revision.defaultTransformer = function (file, hash) {

//     // Get all file extensions so we end up with 'file-hash.min.css' instead of 'file.min-hash.css'
//     let ext = '';
//     while (path.extname(path.basename(file.path, ext)).length) {
//         ext = path.extname(path.basename(file.path, ext)) + ext;
//     }

//     // Build a new filename with the hash
//     const filename = path.basename(file.path, ext) + '-' + hash + ext;

//     return filename;

// };

//Export
module.exports = revision;
