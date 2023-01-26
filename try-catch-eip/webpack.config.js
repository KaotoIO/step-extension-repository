const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { dependencies } = require('./package.json');
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const isPatternflyStyles = (stylesheet) =>
  stylesheet.includes('@patternfly/react-styles/css/') ||
  stylesheet.includes('@patternfly/react-core/');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'auto',
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
        test: /\.(tsx|ts|jsx)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
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
      name: 'stepextensiondotryeip',
      filename: 'remoteEntry.js',
      exposes: {
        './DoCatch': './src/DoCatch',
        './DynamicInputs': './src/DynamicInputs',
      },
      shared: [
        { react: { requiredVersion: dependencies['react'] } },
        { 'react-dom': { requiredVersion: dependencies['react-dom'] } },
        {
          '@patternfly/patternfly/': {
            singleton: true,
            requiredVersion: dependencies['@patternfly/patternfly'],
          },
        },
        {
          '@patternfly/react-core/': {
            singleton: true,
            requiredVersion: dependencies['@patternfly/react-core'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      template: './public/index.html',
    }),
  ],
  resolve: {
    cacheWithContext: false,
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
    symlinks: false,
  },
  stats: 'errors-warnings',
};
