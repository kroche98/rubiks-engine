const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      main: './src/main.js',
      worker: './src/meet-in-the-middle-worker.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
  },
};