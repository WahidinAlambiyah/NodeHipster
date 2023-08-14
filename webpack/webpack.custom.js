const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const tls = process.env.TLS;

module.exports = (config, options, targetOptions) => {
  // PLUGINS
  if (config.mode === 'development') {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'ts'],
      }),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin({
        title: 'Node Hipster',
        contentImage: path.join(__dirname, 'logo-jhipster.png'),
      })
    );
    if (!process.env.JHI_DISABLE_WEBPACK_LOGS) {
      config.plugins.push(
        new SimpleProgressWebpackPlugin({
          format: 'compact',
        })
      );
    }
  }
  if (targetOptions.target === 'serve' || config.watch) {
    config.plugins.push(
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 9000,
          https: tls,
          proxy: {
            target: `http${tls ? 's' : ''}://localhost:${targetOptions.target === 'serve' ? '4200' : '8081'}`,
            proxyOptions: {
              changeOrigin: false, //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            },
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000,
            },
          },
          /*
          ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
            clicks: false,
            location: false,
            forms: false,
            scroll: false,
          },
          */
        },
        {
          reload: targetOptions.target === 'build', // enabled for build --watch
        }
      )
    );
  }

  if (config.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        // Webpack statistics in target folder
        reportFilename: '../stats.html',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    );
  }

  const patterns = [
    // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
  ];

  if (patterns.length > 0) {
    config.plugins.push(new CopyWebpackPlugin({ patterns }));
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: config.mode === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`,
      },
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' },
          { pattern: './src/main/webapp/i18n/al/*.json', fileName: './i18n/al.json' },
          { pattern: './src/main/webapp/i18n/ar-ly/*.json', fileName: './i18n/ar-ly.json' },
          { pattern: './src/main/webapp/i18n/hy/*.json', fileName: './i18n/hy.json' },
          { pattern: './src/main/webapp/i18n/by/*.json', fileName: './i18n/by.json' },
          { pattern: './src/main/webapp/i18n/bn/*.json', fileName: './i18n/bn.json' },
          { pattern: './src/main/webapp/i18n/bg/*.json', fileName: './i18n/bg.json' },
          { pattern: './src/main/webapp/i18n/ca/*.json', fileName: './i18n/ca.json' },
          { pattern: './src/main/webapp/i18n/zh-cn/*.json', fileName: './i18n/zh-cn.json' },
          { pattern: './src/main/webapp/i18n/zh-tw/*.json', fileName: './i18n/zh-tw.json' },
          { pattern: './src/main/webapp/i18n/hr/*.json', fileName: './i18n/hr.json' },
          { pattern: './src/main/webapp/i18n/cs/*.json', fileName: './i18n/cs.json' },
          { pattern: './src/main/webapp/i18n/da/*.json', fileName: './i18n/da.json' },
          { pattern: './src/main/webapp/i18n/nl/*.json', fileName: './i18n/nl.json' },
          { pattern: './src/main/webapp/i18n/et/*.json', fileName: './i18n/et.json' },
          { pattern: './src/main/webapp/i18n/fa/*.json', fileName: './i18n/fa.json' },
          { pattern: './src/main/webapp/i18n/fi/*.json', fileName: './i18n/fi.json' },
          { pattern: './src/main/webapp/i18n/fr/*.json', fileName: './i18n/fr.json' },
          { pattern: './src/main/webapp/i18n/gl/*.json', fileName: './i18n/gl.json' },
          { pattern: './src/main/webapp/i18n/de/*.json', fileName: './i18n/de.json' },
          { pattern: './src/main/webapp/i18n/el/*.json', fileName: './i18n/el.json' },
          { pattern: './src/main/webapp/i18n/hi/*.json', fileName: './i18n/hi.json' },
          { pattern: './src/main/webapp/i18n/hu/*.json', fileName: './i18n/hu.json' },
          { pattern: './src/main/webapp/i18n/in/*.json', fileName: './i18n/in.json' },
          { pattern: './src/main/webapp/i18n/it/*.json', fileName: './i18n/it.json' },
          { pattern: './src/main/webapp/i18n/ja/*.json', fileName: './i18n/ja.json' },
          { pattern: './src/main/webapp/i18n/ko/*.json', fileName: './i18n/ko.json' },
          { pattern: './src/main/webapp/i18n/mr/*.json', fileName: './i18n/mr.json' },
          { pattern: './src/main/webapp/i18n/my/*.json', fileName: './i18n/my.json' },
          { pattern: './src/main/webapp/i18n/pl/*.json', fileName: './i18n/pl.json' },
          { pattern: './src/main/webapp/i18n/pt-br/*.json', fileName: './i18n/pt-br.json' },
          { pattern: './src/main/webapp/i18n/pt-pt/*.json', fileName: './i18n/pt-pt.json' },
          { pattern: './src/main/webapp/i18n/ro/*.json', fileName: './i18n/ro.json' },
          { pattern: './src/main/webapp/i18n/ru/*.json', fileName: './i18n/ru.json' },
          { pattern: './src/main/webapp/i18n/sk/*.json', fileName: './i18n/sk.json' },
          { pattern: './src/main/webapp/i18n/sr/*.json', fileName: './i18n/sr.json' },
          { pattern: './src/main/webapp/i18n/si/*.json', fileName: './i18n/si.json' },
          { pattern: './src/main/webapp/i18n/es/*.json', fileName: './i18n/es.json' },
          { pattern: './src/main/webapp/i18n/sv/*.json', fileName: './i18n/sv.json' },
          { pattern: './src/main/webapp/i18n/tr/*.json', fileName: './i18n/tr.json' },
          { pattern: './src/main/webapp/i18n/ta/*.json', fileName: './i18n/ta.json' },
          { pattern: './src/main/webapp/i18n/te/*.json', fileName: './i18n/te.json' },
          { pattern: './src/main/webapp/i18n/th/*.json', fileName: './i18n/th.json' },
          { pattern: './src/main/webapp/i18n/ua/*.json', fileName: './i18n/ua.json' },
          { pattern: './src/main/webapp/i18n/uz-Cyrl-uz/*.json', fileName: './i18n/uz-Cyrl-uz.json' },
          { pattern: './src/main/webapp/i18n/uz-Latn-uz/*.json', fileName: './i18n/uz-Latn-uz.json' },
          { pattern: './src/main/webapp/i18n/vi/*.json', fileName: './i18n/vi.json' },
          // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
        ],
      },
    })
  );

  config = merge(
    // jhipster-needle-add-webpack-config - JHipster will add custom config
    config
  );

  return config;
};
