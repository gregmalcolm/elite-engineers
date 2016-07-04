// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

// Run Browsersync
browserSync({
  port: 3002,
  ui: {
    port: 3003
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  open: false,

  middleware: [historyApiFallback()]
});
