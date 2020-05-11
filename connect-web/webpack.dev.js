 const path = require('path');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
                 test: /\.css$/i,
                 use: [
                           MiniCssExtractPlugin.loader,
                           'css-loader',
                 ],
               },
    ],
  },

  plugins: [
         new MiniCssExtractPlugin({
           filename: 'css/[name].css'
         }),
             new HtmlWebpackPlugin({
               template: "./public/index.html",
               filename: "./index.html",
             }),


       ],



};
