const gulp = require('gulp');
const gulpTs = require('gulp-typescript');
const tsProject = gulpTs.createProject('./tsconfig.server.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('private'));
});

gulp.task('watch', ['scripts'], (done) => {
  gulp.watch('src/**/*.ts', ['scripts']);
  const nodemon = require('gulp-nodemon');
  nodemon({
    script: './private/index.js',
    env: { 'NODE_ENV': 'development' },
    done: done
  })
});