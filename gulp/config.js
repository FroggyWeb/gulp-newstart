import util from 'gulp-util';
import errorHandler from './util/errors';

const production =
  util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;
const destPath = './assets';

const config = {
  env: 'development',
  production: production,

  src: {
    root: '_dev',
    templates: '_dev/pug',
    sass: '_dev/sass',
    sassGen: '_dev/sass/generated',
    js: '_dev/js',
    img: '_dev/img',
    svg: '_dev/img/svg',
    icons: '_dev/icons',
    iconsPng: '_dev/icons/png',
    iconsSvgMono: '_dev/icons/svg-mono',
    iconsSvgColor: '_dev/icons/svg-colors',
    iconsFont: '_dev/icons',
    components: '_dev/js/components',
    // fonts: '_dev/fonts',
    // video: '_dev/video',
    // php: '_dev/php',
    // json: '_dev/json',
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/img',
    // fonts: destPath + '/fonts',
    // video: destPath + '/video',
    // php: destPath + '/php',
    // json: destPath + '/json',
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    util.log('Environment:', util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' '));
  },

  errorHandler: errorHandler,
};

config.setEnv(production ? 'production' : 'development');

export default config;
