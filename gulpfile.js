const gulp = require('gulp');

const jsxCompiler = require('./gulp-task/jsxCompiler');
const backendWatcher = require('./gulp-task/backendWatcher');
const browserSync = require('browser-sync').create();

global.reload = browserSync.reload;

const confUser = {
  fileName:"bundle.js", 
  dirTarget: "./public/js/", 
  mainSource: "../resources/react/app.js" ,
  reload: global.reload
};

gulp.task('compile-jsx',() => jsxCompiler({...confUser, pluginChoice: "react", watch:false}));
gulp.task('watch-jsx', () => jsxCompiler({...confUser, pluginChoice: "react",watch:true}));
gulp.task('nodemon', backendWatcher);
gulp.task('set-dev', () => {
  process.env.NODE_ENV = 'development';
});
gulp.task('set-prod', () => {
  process.env.NODE_ENV = 'production';
});
  
gulp.task('production', ['set-prod'], () => {
  gulp.start('compile-jsx');
});

gulp.task(
  'watch', 
  ['set-dev', 'nodemon', 'watch-jsx'],
  function(){    
    browserSync.init({
      proxy: "localhost:3000",  // local node app address
      host: "localhost" ,
      port: 4000,  // use *different* port than above
      notify: true ,
      open: 'external'
    });

    gulp.watch('resources/assets/js/*.js', ['compile-js']);
    gulp.watch('resources/views/*.mustache').on('change', () => {
      global.reload();
    });
  }
);