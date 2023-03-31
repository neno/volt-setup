const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'pwc',
    projectName: 'example',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          ui: 'ui@http://localhost:3001/remoteEntry.js',
        },
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
    // modify the webpack config however you'd like to by adding to this object
  });
};
