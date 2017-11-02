/**
 * Created by Helex on 2017/5/25.
 */

var path = require("path");
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var copyWebpackPlugin = require("copy-webpack-plugin");
var replaceWebpackPlugin = require('./replace-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./app/app.js"],
    //devtool: "eval",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist'),
        chunkFilename: "[chunkhash].[id].chunk.js",
        publicPath: "/"//请求chunk资源时
    },

    plugins: [
        new copyWebpackPlugin([
            {//拷贝图片
                from: "app/assets/img",
                to: "assets/img"
            }
        ]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        }),
        // optimize module ids by occurrence count
        new webpack.optimize.OccurrenceOrderPlugin(),
        new WebpackMd5Hash(),
        new replaceWebpackPlugin({
            template: "app/index.html"
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'scss': path.resolve(__dirname, './app/assets/scss')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
            },
            {
                test: /\.vue$/, loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        'js': 'babel-loader'
                    },
                    // other vue-loader options go here
                    preLoaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.scss$/, use: [
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false
                    }
                }
            ]
            }
            , {//拷贝fonts文件
                test: /\.(woff|svg|eot|ttf|otf)\??/,
                loader: 'file-loader?name=assets/fonts/[hash].[ext]'
            }
            , {//拷贝html文件
                test: /\.(html)$/,
                //loader: 'file-loader?name=[name].[ext]',
                loader: 'file-loader'
            }
            , {//拷贝图片文件文件
                test: /\.(png|jpg|ico)$/,
                //loader: 'file-loader?name=assets/img/[name].[ext]',
                loader: 'file-loader?name=assets/img/[hash].[ext]'
            }
        ]
    }
};