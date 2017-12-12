var path = require('path');
var webpack = require('webpack');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');

var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;
var clientEntries = require('./client-entries');
var clientPagePlugins = require('./client-page-plugins');
var serverPagePlugins = require('./server-page-plugins');

var commonConfig = {
    devtool: 'source-map',
    output: {
        publicPath: 'http://localhost:3000/',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        })
    ]
};

const clientConfig = merge(commonConfig, {
    target: 'web',
    entry: clientEntries,
    output: {
        path: path.resolve(__dirname, '..', 'build/public'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "plugins": [
                            [
                                "import",
                                {
                                    "libraryName": "antd",
                                    "libraryDirectory": "es",
                                    "style": true
                                }
                            ]
                        ]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.png|jpg|bmp$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images/',
                            name: '[name].[ext]?[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]?[hash:8]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
    ].concat(clientPagePlugins)
});

const serverConfig = merge(commonConfig, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '..', 'src/server/server.js')
    },
    output: {
        path: path.resolve(__dirname, '..', 'build/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["css-loader"]
            },
            {
                test: /\.less$/,
                use: ['css-loader', 'less-loader']
            },
            {
                test: /\.png|jpg|bmp$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images/',
                            name: '[name].[ext]?[hash:8]',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        outputPath: 'fonts/',
                        name: '[name].[ext]?[hash:8]',
                        emitFile: false
                    }
                }]
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, '..', 'build'), {
            root: path.resolve(__dirname, '..'),
            verbose: true
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '..', 'package.prod.json'), to: path.resolve(__dirname, '..', 'build/package.json') },
        ], {
                ignore: ['*.log', 'templates/**/*.*']
            }),
        new HtmlWebpackExcludeAssetsPlugin()
    ].concat(serverPagePlugins),
    externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })]
});

module.exports = [serverConfig, clientConfig];