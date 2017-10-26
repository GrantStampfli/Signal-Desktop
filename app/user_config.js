const path = require('path');

const app = require('electron').app;
const ElectronConfig = require('electron-config');

const type = require('./app_type');
const config = require('./config');


// use a separate data directory for development
if (config.has('storageProfile')) {
  const userData = path.join(
    app.getPath('appData'),
    'Signal-' + config.get('storageProfile')
  );

  app.setPath('userData', userData);
}

// use a separate data directory for beta builds
if (type) {
  const userData = app.getPath('userData') + '-' + type;

  app.setPath('userData', userData);
}

console.log('userData: ' + app.getPath('userData'));

// this needs to be below our update to the appData path
const userConfig = new ElectronConfig();

module.exports = userConfig;
