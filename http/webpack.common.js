const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dependencies } = require('./package.json');
const path = require('path');

const isPatternflyStyles = (stylesheet) =>
  stylesheet.includes('@patternfly/react-styles/css/') ||
  stylesheet.includes('@patternfly/react-core/');

module.exports = () => {
  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    target: 'web',
    devtool: 'source-map',
    output: {
      hashFunction: 'xxhash64',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        http: require.resolve('stream-http'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: isPatternflyStyles,
          use: ['null-loader'],
          sideEffects: true,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new ModuleFederationPlugin({
        name: 'httpStep',
        filename: 'remoteEntry.js',
        exposes: {
          './HttpStep': './src/Components/HttpStep',
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: dependencies['react-i18next'],
          },
          'react-router-dom': {
            requiredVersion: dependencies['react-router-dom'],
          },
          '@patternfly/patternfly/': {
            singleton: true,
            requiredVersion: dependencies['@patternfly/patternfly'],
          },
          '@patternfly/react-core/': {
            singleton: true,
            requiredVersion: dependencies['@patternfly/react-core'],
          },
        },
      }),
      new NodePolyfillPlugin({
        includeAliases: ['https', 'process', 'Buffer'],
      }),
      new DefinePlugin({
        browser: true,
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
  };
};
