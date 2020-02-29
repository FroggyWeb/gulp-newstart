import gulp from 'gulp';
import pug from 'gulp-pug';
import pugbem from 'gulp-pugbem';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import config from '../config';

pugbem.b = true;

const renderHtml = onlyChanged =>
  gulp
    .src([config.src.templates + '/[^_]*.pug'])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
    .pipe(pug({ pretty: true, plugins: [pugbem] }))
    .pipe(replace('../../', './'))
    .pipe(replace('../', './'))
    .pipe(gulp.dest(config.dest.html));

const buildPug = () => renderHtml();
const watch = () => () => {
  gulp.watch([config.src.templates + '/**/[^_]*.pug'], buildPug);

  gulp.watch([config.src.templates + '/**/_*.pug'], buildPug);
};

module.exports.build = buildPug;
module.exports.watch = watch;
