/**
 * Created by Helex on 2017/1/31.
 */

var path = require("path");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill", "./app/app.js"],
    devtool: "eval-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"./dist")

    },

    plugins: [
        new copyWebpackPlugin([
            {//拷贝图片
                from: "app/assets/img",
                to: "assets/img"
            }
        ])
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'scss': path.resolve(__dirname, './app/assets/scss')
        }
    },

    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {
                test: /\.vue$/, loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.scss$/, use: [
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
            }
            , {//拷贝fonts文件
                test: /\.(woff|svg|eot|ttf|otf)\??/,
                loader: 'file-loader?name=assets/font-awesome/fonts/[name].[ext]'
            }
            , {//拷贝html文件
                test: /\.(html)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};