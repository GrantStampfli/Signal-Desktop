const fs = require('fs');
const _ = require('lodash');

const packageJson = require('./package.json');
const aptlyJson = JSON.parse(fs.readFileSync('./.aptly.conf'));

// -------

const BUILD_TYPE_PATH = 'type';

const PRODUCTION_TYPE = undefined;
const BETA_TYPE = 'beta';

const WINDOWS_GENERIC_PATH = 'build.win.publish[0].url';
const WINDOWS_S3_PATH = 'build.win.publish[1].path';
const OSX_GENERIC_PATH = 'build.mac.publish[0].url';
const OSX_S3_PATH = 'build.mac.publish[1].path';

const PRODUCTION_PATH = 'https://updates.signal.org/desktop';
const BETA_PATH = 'https://updates.signal.org/desktop-beta'

const PRODUCTION_DIR = 'desktop';
const BETA_DIR = 'desktop-beta';


const APTLY_PREFIX_PATH = 'S3PublishEndpoints.signal-desktop-apt.prefix';

const APTLY_PRODUCTION_PREFIX = 'desktop/apt';
const APTLY_BETA_PREFIX = 'desktop-beta/apt';

// -------

function checkValue(object, objectPath, value) {
  if (_.get(object, objectPath) !== value) {
    throw new Error(objectPath + ' is not ' + value);
  }
}

// ------

checkValue(packageJson, WINDOWS_GENERIC_PATH, PRODUCTION_PATH);
checkValue(packageJson, OSX_GENERIC_PATH, PRODUCTION_PATH);

checkValue(packageJson, WINDOWS_S3_PATH, PRODUCTION_DIR);
checkValue(packageJson, OSX_S3_PATH, PRODUCTION_DIR);

checkValue(packageJson, BUILD_TYPE_PATH, PRODUCTION_TYPE);

checkValue(aptlyJson, APTLY_PREFIX_PATH, APTLY_PRODUCTION_PREFIX);

// -------

_.set(packageJson, WINDOWS_GENERIC_PATH, BETA_PATH);
_.set(packageJson, OSX_GENERIC_PATH, BETA_PATH);

_.set(packageJson, WINDOWS_S3_PATH, BETA_DIR);
_.set(packageJson, OSX_S3_PATH, BETA_DIR);

_.set(packageJson, BUILD_TYPE_PATH, BETA_TYPE);

_.set(aptlyJson, APTLY_PREFIX_PATH, APTLY_BETA_PREFIX);

// -------

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '  '));
fs.writeFileSync('./.aptly.conf', JSON.stringify(aptlyJson, null, '  '));
