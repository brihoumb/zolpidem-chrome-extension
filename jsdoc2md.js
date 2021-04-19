'use strict';

const jsdoc2md = require('jsdoc-to-markdown');
const {readdir, writeFile} = require('fs').promises;
const {posix, win32, join, resolve} = require('path');
const system = (process.platform === "win32" ? "win32" : "posix");

async function *getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield *getFiles(res);
    } else {
      if (res.endsWith('.js')) {
        yield res;
      }
    }
  }
}

async function writeToFile(content, file) {
  let basename = '';
  if (system === "win32") {
    basename = win32.basename(file, '.js');
  } else {
    basename = posix.basename(file, '.js');
  }
  await writeFile(join('documentation', basename + '.md'), content, 'utf8');
}

(async () => {
  for await (const file of getFiles('src')) {
    jsdoc2md.render({ files: file }).then(content => writeToFile(content, file));
  }
})();
