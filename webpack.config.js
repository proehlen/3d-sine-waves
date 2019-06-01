const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: env.development,
    }),
    new HtmlWebpackPlugin({
      title: 'Waves',
      template: 'src/index.html',
    }),
    new CopyPlugin([
      { from: 'src/_config.yml' },
      { from: 'src/assets', to: 'assets' },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  }
});
