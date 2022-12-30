const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
//https://www.youtube.com/watch?v=8OCEfOKzpAw


module.exports = {
  entry: {
    popup: './src/popup.jsx',
    newtab: './src/newtab.jsx',
    background: './src/background.js',
    contentScript: './src/contentScript.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [ {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
        template: './src/newtab.html',
        filename: 'newtab.html',
    }),
    new CopyWebpackPlugin({
        patterns: [
            {from: 'public'}
        ],
    }),  
]
 
};