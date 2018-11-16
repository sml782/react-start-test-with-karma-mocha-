const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config');

const TEST_BUNDLER = './tests/test-bundler.js';

const karmaConfig = {
  basePath: '../',
  browsers: ['PhantomJS'], // 'Chrome'
  singleRun: !argv.watch,
  coverageReporter: {
    reporters: [
      { type: 'text-summary' },
    ],
  },
  files: [{
    pattern  : TEST_BUNDLER,
    watched  : false,
    served   : true,
    included : true
  }],
  // client: {
  //   mocha: {
  //     timeout: 0,
  //     reporter: 'html',
  //     ui: 'bdd'
  //   }
  // },
  // browserNoActivityTimeout: 300000,
  // colors: true,
  frameworks: ['mocha'],
  reporters: ['mocha'], // spec
  preprocessors: {
    [TEST_BUNDLER]: ['webpack'],
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: '',
  },
  webpack: {
    entry: TEST_BUNDLER,
    devtool: 'cheap-module-source-map',
    module: webpackConfig.module,
    plugins: webpackConfig.plugins,
    resolve: webpackConfig.resolve,
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    },
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true,
  },
};

module.exports = (cfg) => cfg.set(karmaConfig);
