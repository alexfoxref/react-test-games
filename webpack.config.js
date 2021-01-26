const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`)

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: isProd
      ? [
          new TerserWebpackPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ]
      : [],
  },
  devServer: {
    port: 4040,
    hot: isDev,
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    historyApiFallback: true,
  },
  target: isDev ? 'web' : 'browserslist',
  devtool: `${isProd ? 'nosources-' : ''}source-map`,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
}
