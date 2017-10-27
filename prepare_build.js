const fs = require('fs');
const _ = require('lodash');

const packageJson = require('./package.json');
const version = packageJson.version;
const beta = /beta/;

// You might be wondering why this file is necessary. It comes down to our desire to allow
//   side-by-side installation of production and beta builds. Electron-Builder uses
//   top-level data from package.json for many things, like the executable name, the
//   debian package name, the install directory under /opt on linux, etc. We tried
//   adding the ${channel} macro to these values, but Electron-Builder didn't like that.

if (!beta.test(version)) {
  return;
}

console.log('prepare_build: updating package.json for beta build');

// -------

const NAME_PATH = 'name';
const PRODUCTION_NAME = 'signal-desktop';
const BETA_NAME = 'signal-desktop-beta';

const PRODUCT_NAME_PATH = 'productName';
const PRODUCTION_PRODUCT_NAME = 'Signal';
const BETA_PRODUCT_NAME = 'Signal Beta';

// -------

function checkValue(object, objectPath, value) {
  if (_.get(object, objectPath) !== value) {
    throw new Error(objectPath + ' is not ' + value);
  }
}

// ------

checkValue(packageJson, NAME_PATH, PRODUCTION_NAME);
checkValue(packageJson, PRODUCT_NAME_PATH, PRODUCTION_PRODUCT_NAME);

// -------

_.set(packageJson, NAME_PATH, BETA_NAME);
_.set(packageJson, PRODUCT_NAME_PATH, BETA_PRODUCT_NAME);

// -------

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '  '));
