const webpack = require('webpack');
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const path = require('path');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const devConfig = require('./webpack.config');
const compiler = webpack(devConfig);

app.use(static(
    path.join(__dirname, './dist')
))

app.use(devMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    quiet: true // 向控制台显示任何内容
}))
app.use(hotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2000
}))
app.listen(3000, () => {
    console.log('server is starting at port 3000')
})