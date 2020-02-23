/**
 * Created by Helex on 2017/5/25.
 */

var path = require("path");
var copyWebpackPlugin = require("copy-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: ["babel-polyfill", "./app/app.js"],
    //devtool: "eval",
    output: {
        filename: "[name].[chunkhash].js",
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
        new HtmlWebpackPlugin({
            title: 'HELEX',
            template: './app/index.html', // Load a custom template (lodash by default see the FAQ for details)
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'scss': path.resolve(__dirname, './app/assets/scss'),
            '@app': path.resolve(__dirname, 'app'),
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
            },
            {
                test: /\.vue$/, loader: 'vue-loader'
            },
            {
                test: /\.scss$/, use: [
                    'vue-style-loader',
                    'css-loader',
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
                loader: 'file-loader',
                options: {
                    esModule: false,
                }
            }
            , {//拷贝图片文件文件
                test: /\.(png|jpe?g|ico)$/i,
                loader: 'file-loader',
                options: {
                    esModule: false,
                }
            }
        ]
    }
};