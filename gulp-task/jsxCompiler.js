const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const gulp = require('gulp');
const rev = require('gulp-rev');
const cleanManifest = require('./cleanManifest');

const size = require('gulp-size');
// const notify = require('gulp-notify');

module.exports = ({fileName, dirTarget, mainSource, pluginChoice, watch, reload}) => new Promise((resolve, reject) => { 
  let bundler;
  const production = process.env.NODE_ENV === 'production';

  bundler = browserify(mainSource, {
    basedir: __dirname ,
    debug: !production ,
    extensions: [".js", ".jsx"] ,
    cache: {} , //require for watchify
    packageCache: {} , // required for watchify
    fullPaths: watch // required to be true only for watchify
  });

  if (watch) bundler = watchify(bundler);

  const plugin = pluginChoice === 'preact' 
  ? ["transform-react-jsx", { "pragma": "h" }] 
  : ["transform-class-properties", { "spec": true }];

  bundler.transform(babelify, {
    presets: ["es2015", "react"] ,
    plugins: [ plugin , ["transform-object-rest-spread"] ]
  });

  const rebundle = async () => {
    await cleanManifest(dirTarget, fileName);
    console.info('JSX Compiler: starting compile', fileName);
    const s = size({ showTotal: false });
    let stream = bundler.bundle();
    stream.on('error', (err) => console.info(err));
    // stream.on('end', () => console.info('end jsx complie'));
    stream = stream.pipe(source(fileName)).pipe(buffer());    

    if(production) stream = stream.pipe(uglify()).pipe(s).on('end', () => {
      console.info(`JSX Compiler: size of ${fileName} ${s.prettySize}`)
      resolve();
    });

    return stream
      .pipe(rev())
      .pipe(gulp.dest(dirTarget))
      .pipe(rev.manifest({merge: true}))
      .pipe(gulp.dest('./'))
      .pipe(reload({ stream: true }));
  };

  bundler.on('update', rebundle);
  bundler.on('time', (time) => console.info(`JSX Compiler: ${fileName} compile time ${(time/1000).toFixed(2)}s`));
  bundler.on('bytes', (bytes) => {
    const size = (bytes/1000).toFixed(2);
    console.info(`JSX Compiler: size of ${fileName} ${size > 1024 ? `${(size/1024).toFixed(2)}MB` : `${size}KB`}`);
  });
  bundler.on('log', (msg) => {
    console.info(`JSX Compiler: ${fileName} file have been written`);
    resolve();
  });
  
  rebundle();
});