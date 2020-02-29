import gulp from 'gulp';
import path from 'path';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import uglifyJs from 'gulp-uglify';
import babel from 'gulp-babel';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import config from '../config';
import webpackConfig  from "../webpack.config.js";


const javascriptApp = () =>
  gulp
    .src([config.src.js + '/*.js'])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(gulp.dest(config.dest.js));


const buildJavascript = () => gulp.parallel(javascriptApp);

const watch = () => () => {
  gulp.watch([config.src.js + '/*.js'], javascriptApp);
  gulp.watch(
    [
      config.src.js + '/js/*.js',
      config.src.components + '/**/*.js',
    ],
    javascriptApp
  );
};

module.exports.build = buildJavascript;
module.exports.watch = watch;
