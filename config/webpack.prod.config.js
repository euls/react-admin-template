var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSClassnamesPlugin = require('optimize-css-classnames-plugin');
var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');

var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;
var clientEntries = require('./client-entries');
var clientPagePlugins = require('./client-page-plugins');
var serverPagePlugins = require('./server-page-plugins');

var theme = require('./theme');

var commonConfig = {
    output: {
        publicPath: 'http://localhost:3000/'
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

const clientConfig = merge(commonConfig, {
    target: 'web',
    entry: Object.assign({}, {
        commons: ["antd"]
    }, clientEntries),
    output: {
        path: path.resolve(__dirname, '..', 'dist/public'),
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
                            ],
                            "syntax-dynamic-import",
                            ["import-inspector", {
                                "serverSideRequirePath": true
                            }]
                        ]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme
                        }
                    }]
                })
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
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: 'optimize-css-classnames-html'
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new OptimizeCSSClassnamesPlugin({
            prefix: '_',
            ignore: [
                'blink-class',
                /^e2e-/
            ]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "js/commons.js",
            // (给 chunk 一个不同的名字)

            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        })
    ].concat(clientPagePlugins)
});

const serverConfig = merge(commonConfig, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '..', 'src/server/server.js')
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist/server'),
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
        new CleanWebpackPlugin(path.resolve(__dirname, '..', 'dist'), {
            root: path.resolve(__dirname, '..'),
            verbose: true
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '..', 'package.prod.json'), to: path.resolve(__dirname, '..', 'dist/package.json') },
        ], {
                ignore: ['*.log', 'templates/**/*.*']
            }),
        new HtmlWebpackExcludeAssetsPlugin()
    ].concat(serverPagePlugins),
    externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })]
});

module.exports = [serverConfig, clientConfig];