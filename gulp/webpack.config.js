import config from './config';
import webpack from 'webpack';

const path = require("path");

module.exports = {
  mode: config.production ? 'production' : 'development',
  entry: {
    main: './' + config.src.js + '/index.js',
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/"
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /node_modules/,
  //         chunks: "initial",
  //         name: "vendor",
  //         enforce: true
  //       }
  //     }
  //   }
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: [
              ["@babel/preset-env", { modules: false }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
  ],

  resolve: {
    alias: {
      "%components%": path.resolve(__dirname, "_dev/components")
    }
  }
};
