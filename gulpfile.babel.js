import gulp from 'gulp';
import config from './gulp/config';

const tBuild = (task, cb) => require('./gulp/tasks/' + task).build(cb);
const tWatch = task => require('./gulp/tasks/' + task).watch();

gulp.task('server', cb => tBuild('server', cb));
gulp.task('clear', () => tBuild('clear'));
gulp.task('sass', () => tBuild('sass'));
gulp.task('pug', () => tBuild('pug'));
gulp.task('javascript', tBuild('javascript'));
gulp.task('images', () => tBuild('images'));
gulp.task('sprite:svg', tBuild('sprite-svg/sprite-svg'));
gulp.task('sprite:png', () => tBuild('sprite-png/sprite-png'));
// gulp.task('copy', tBuild('copy'));

gulp.task('sass:watch', tWatch('sass'));
gulp.task('pug:watch', tWatch('pug'));
gulp.task('javascript:watch', tWatch('javascript'));
gulp.task('sprite:svg:watch', tWatch('sprite-svg/sprite-svg'));
gulp.task('sprite:png:watch', tWatch('sprite-png/sprite-png'));
// gulp.task('copy:watch', tWatch('copy'));
// gulp.task('images:watch', tWatch('images'));

const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
};

const setmodeDev = done => {
  config.setEnv('development');
  config.logEnv();
  done();
};

const makeBuild = mode => {
  const setMode = mode === 'prodcution' ? setmodeProd : setmodeDev;
  return gulp.series(
    setMode,
    // 'clear',
    gulp.parallel('sprite:svg', 'sprite:png'),
    gulp.parallel('sass', 'javascript'),
    'pug',
    // gulp.parallel('images', 'copy')
  );
};

gulp.task('build', makeBuild('prodcution'));
gulp.task('build:development', makeBuild('development'));

gulp.task(
  'watch',
  gulp.parallel(
    'sass:watch',
    'pug:watch',
    'javascript:watch',
    'sprite:svg:watch',
    'sprite:png:watch'
    // 'copy:watch',
    // 'images:watch',
  )
);

gulp.task('default', gulp.series(['build:development', 'server', 'watch']));
