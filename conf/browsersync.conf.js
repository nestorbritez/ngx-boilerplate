const conf = require('./gulp.conf');

module.exports = function () {
  return {
    online: true,
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false
  };
};
