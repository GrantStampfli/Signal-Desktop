const fs = require('fs');
const path = require('path');

const app = require('electron').app;
const ElectronConfig = require('electron-config');

const config = require('./config');


const jsonFile = fs.readFileSync(path.join(__dirname, '..', 'package.json'));
const packageJson = JSON.parse(jsonFile, 'utf-8');

// use a separate data directory for development
if (config.has('storageProfile')) {
  const userData = path.join(
    app.getPath('appData'),
    'Signal-' + config.get('storageProfile')
  );

  app.setPath('userData', userData);
}

// use a separate data directory for beta builds
if (packageJson.type) {
  const userData = app.getPath('userData') + '-' + packageJson.type;

  app.setPath('userData', userData);
}

console.log('userData: ' + app.getPath('userData'));

// this needs to be below our update to the appData path
const userConfig = new ElectronConfig();

module.exports = userConfig;
