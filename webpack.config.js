const path = require('path');
// 启用热更新的 第2步
const webpack = require('webpack')
// 导入在内存中生成 HTML 页面的 插件
// 只要是插件，都一定要 放到 plugins 节点中去
// 这个插件的两个作用：
//  1. 自动在内存中根据指定页面生成一个内存的页面
//  2. 自动，把打包好的 bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {   // 这是配置 dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
        open: true,
        port: 3000,
        //contentBase: 'src',
        hot: true // 启动热更新的第1步
    },
    plugins: [ // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new  一个热更新的模块对象,这是启用热更新的第3步
        new htmlWebpackPlugin({ // 创建一个,在内存中生成HTML 页面插件
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: { // 这个节点，用于配置 所有 第三方模块 加载器 
        rules: [ // 所有第三方模块的 匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.(jpg|png|gif|bmp)$/, use: 'url-loader?limit=64508&name=[hash:8]-[name].[ext]' },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader' },
            { test: /\.js$/, exclude: /node_modules/, use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-class-properties",
                        ["component",
                            {
                                "libraryName": "mint-ui",
                                "style": true
                            }
                        ]
                    ]
                }
            } },
            { test: /\.vue$/, loader: 'vue-loader'}
        ]
    },
    resolve: {
        alias: {
            //"vue$": "vue/dist/vue.js"
        }
    }
}