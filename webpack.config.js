const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    bundle: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },

      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
