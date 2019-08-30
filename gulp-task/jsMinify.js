const gulp = require('gulp');
const minifyJS = require('gulp-babel');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

module.exports = () => {
  return gulp.src('resources/assets/js/*.js')
    .pipe(plumber())
    .pipe(minifyJS({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(global.reload({ stream:true }))
    .pipe(global.reloadOrganization({ stream:true }));
}