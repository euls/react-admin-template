var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/client/templates/index.html'),
        filename: 'index.html',
        chunks: ['home'],
        hash: true
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/client/templates/login.html'),
        filename: 'login.html',
        chunks: ['login'],
        hash: true
    })
 ] 