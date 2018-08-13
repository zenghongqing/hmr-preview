const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const RootPath = path.resolve(__dirname);
const AppPath = path.resolve(__dirname, 'app');
const BuildPath = path.resolve(__dirname, 'build');

module.exports = {
    // mode: 'development',
   //实现刷新浏览器webpack-hot-middleware/client?path=/__webpack_hmr&noInfo=true&reload=true 后面的参数是必填的, 前面path=/__webpack_hmr与后边 
     // hotMiddleware 的path匹配
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&noInfo=true&reload=true', AppPath],
    output: {
        path: BuildPath,
        filename: 'bundle.js'  //将app文件夹中的两个js文件合并成build目录下的bundle.js文件
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    'presets': ['es2015', 'stage-0']
                },
                include: ['./src']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World app'
    }),//在build目录下自动生成index.html，指定其title
    // 实现刷新浏览器必写
    new webpack.HotModuleReplacementPlugin()
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoErrorsPlugin()
    ]
}