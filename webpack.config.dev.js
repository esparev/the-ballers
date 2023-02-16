const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles/components/'),
      '@functions': path.resolve(__dirname, 'src/utils/functions/'),
      '@constants': path.resolve(__dirname, 'src/utils/constants/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@static': path.resolve(__dirname, 'src/assets/static/'),
      '@config': path.resolve(__dirname, 'src/utils/config/'),
      '@icons': path.resolve(__dirname, 'src/assets/icons/'),
      '@mainStyles': path.resolve(__dirname, 'src/styles/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  devServer: {
    port: 3003,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
};
