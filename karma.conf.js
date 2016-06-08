// Karma configuration
// Generated on Fri May 20 2016 18:16:52 GMT+0200 (Romance Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ngstorage/ngStorage.js',
      'www/lib/firebase/firebase.js',
      'www/lib/angularfire/dist/angularfire.min.js',
      
      // app      
      'www/js/app.js',
      'www/specs/home.specs.js',
      'www/specs/todo.specs.js',
      'www/specs/todo.service.specs.js',
      'www/specs/utilities.service.specs.js',
      'www/specs/storage.service.specs.js',
      'www/specs/mockingData.js'
    ],


    // list of files to exclude
    exclude: [
      'karma.conf.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    
    preprocessors: {
      'www/js/*.js' : ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'www/coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
