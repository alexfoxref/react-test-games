const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => (isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`)
const cssLoaders = loader => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [postcssPresetEnv()],
        },
      },
    },
  ]

  if (loader) {
    loaders.push(loader)
  }

  return loaders
}

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
          new OptimizeCssAssetsPlugin(),
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
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ca]ss$/,
        use: cssLoaders('sass-loader'),
      },
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
