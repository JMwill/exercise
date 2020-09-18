const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rules = [{
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
}, {
  test: /\.(png|jpg|svg|gif)$/,
  use: 'file-loader',
}, {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}, {
  test: /.less$/,
  use: ['style-loader', 'css-loader', 'less-loader'],
}]

module.exports = (mode = 'production') => ({
  mode,
  devtool: mode === 'development' ? 'eval-source-map': undefined,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:4].js',
  },
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'assets/**/*',
      to: path.join(__dirname, 'dist/'),
      flatten: true,
    }]),
    new CopyWebpackPlugin([{
      from: './index.html',
      to: path.join(__dirname, 'dist/'),
      flatten: true,
    }])
  ],
})
