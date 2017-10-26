const Electron = require('electron');


const version = Electron.app.getVersion();
const beta = /beta/;


if (beta.test(version)) {
  module.exports = 'beta';
} else {
  module.exports = null;
}


