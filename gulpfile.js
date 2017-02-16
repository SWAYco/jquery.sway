
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    concat = require('gulp-concat'),
    pkg = require('./package.json');

var banner = [
  '/**',
  ' ** <%= pkg.name %> - <%= pkg.description %>',
  ' ** @author <%= pkg.author %>',
  ' ** @version v<%= pkg.version %>',
  ' ** @license <%= pkg.license %>',
  ' **/',
  ''
].join('\n');

var buildTask = function(files, postfix) {
  postfix = postfix || '';
  gulp.src(files)
      .pipe(uglify({
        preserveComments: function(q, w) {
          if(w.value.indexOf('File:') != -1) {
            return true;
          }
        }
      }))
      .pipe(concat('jquery.sway'+ (postfix ? '.' + postfix : '') +'.js'))
      .pipe(header(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist/'));
};

gulp.task('build:debug', function() {
  buildTask(['bower_components/iframe-resizer/src/iframeResizer.js', 'bower_components/visionmedia-debug/dist/debug.js', 'src/jquery.sway.js'], 'debug');
});

gulp.task('build', function() {
  buildTask(['bower_components/iframe-resizer/src/iframeResizer.js', 'src/jquery.sway.js']);
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['build', 'build:debug']);
});

gulp.task('default', ['build', 'build:debug', 'watch']);

