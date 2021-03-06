var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').Server;

var paths = {
  sass: ['./scss/**/*.scss']
};

var angularFiles = ['www/js/app/**/*.js'];

gulp.task('default', ['watch']);

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('lint-js', function () {
  return gulp.src(angularFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concat-app', ['lint-js'], function () {
  return gulp.src(angularFiles)
    .pipe(concat("app.js"))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(angularFiles, ['lint-js', 'concat-app']);
});

gulp.task('run-tests', ['concat-app'],function (done) {
  new karma({
    configFile: __dirname + '\\karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
