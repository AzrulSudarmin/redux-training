const fs = require('fs');
const clean = require('gulp-clean');
const gulp = require('gulp');

module.exports = (loc, fileName) => new Promise((resolve, reject) => {
  fs.access('./rev-manifest.json', (err) => { 
    if(!err){
      const manifestJson = JSON.parse(fs.readFileSync('./rev-manifest.json', 'utf8'));
      if (manifestJson[fileName]) {
        fs.access(loc + manifestJson[fileName], (err) => {
          if (!err) {
            gulp.src(loc + manifestJson[fileName], {read: false})
              .pipe(clean({force: true}));
            
            resolve();
          } else {
            resolve()
          }
       })
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
});