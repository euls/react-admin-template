var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

var isDev = process.env.NODE_ENV !== 'production';

// console.log('now is in: ', process.env.NODE_ENV);

module.exports = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/server/views/about.hbs'),
        filename: 'views/about.hbs',
        inject: true,
        excludeAssets: [/server.js/]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        files: ['views/about.hbs'],
        assets: isDev ? ['js/about.js'] : ['css/about.css','js/about.js'],
        append: false,
        hash: true
    })
]