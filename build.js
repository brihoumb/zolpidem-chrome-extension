'use strict';

const crx3 = require('crx3');
const {generateKeyPairSync} = require('crypto');
const {mkdirSync, writeFileSync, existsSync} = require('fs');

if (!existsSync('dist')) {
  const {publicKey, privateKey} = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {type: 'spki', format: 'pem'},
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
  });

  mkdirSync('dist');
  writeFileSync('dist/id_rsa', privateKey);
  writeFileSync('dist/id_rsa.pub', publicKey);
}

crx3(['src/manifest.json'], {
  keyPath: 'dist/id_rsa',
  crxPath: 'dist/zolpidem.crx',
  zipPath: 'dist/zolpidem.zip',
  xmlPath: 'dist/zolpidem.xml',
}).then(() => console.log('done')).catch(console.error);
