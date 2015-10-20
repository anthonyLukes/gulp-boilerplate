var CONFIG = require('./build-config.js');
module.exports = {
  entry: CONFIG.JS.INPUT,
  output: {
    path: CONFIG.JS.OUTPUT_DIR,
    filename: CONFIG.JS.OUTPUT_FILE
  },
  devtool: 'source-map',
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
};