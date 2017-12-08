var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = [
    // error pages
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/server/views/errors/404.hbs'),
        filename: 'views/errors/404.hbs',
        inject: true,
        excludeAssets: [/server.js/]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        files: ['views/errors/404.hbs'],
        assets: isDev ? ['js/404.js'] : ['css/404.css','js/404.js'],
        append: false,
        hash: true
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/server/views/errors/500.hbs'),
        filename: 'views/errors/500.hbs',
        inject: true,
        excludeAssets: [/server.js/]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        files: ['views/errors/500.hbs'],
        assets: isDev ? ['js/500.js'] : ['css/500.css','js/500.js'],
        append: false,
        hash: true
    }),
    // home & login & about
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/server/views/signin.hbs'),
        filename: 'views/signin.hbs',
        inject: true,
        excludeAssets: [/server.js/]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        files: ['views/signin.hbs'],
        assets: isDev ? ['js/signin.js'] : ['css/signin.css','js/signin.js'],
        append: false,
        hash: true
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/server/views/home.hbs'),
        filename: 'views/home.hbs',
        inject: true,
        excludeAssets: [/server.js/]
    }),
    new HtmlWebpackIncludeAssetsPlugin({
        files: ['views/home.hbs'],
        assets: isDev ? ['js/home.js'] : ['css/home.css','js/home.js'],
        append: false,
        hash: true
    }),
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