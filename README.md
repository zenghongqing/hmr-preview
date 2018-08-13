### 使用koa2实现热重载和实时预览

devMiddleware的配置参数有：
```
// display no info to console (only warnings and errors)
    noInfo: false,
 
    // display nothing to the console
    quiet: false,
 
    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: true,
 
    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
 
    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: "/assets/",
 
    // custom headers
    headers: { "X-Custom-Header": "yes" },
 
    // options for formating the statistics
    stats: {
        colors: true
    }
```
hotMiddleware的配置参数：
* log - 用于记录行的函数，传递false到禁用。默认为console.log
* path - 中间件将服务事件流的路径必须与客户端设置相匹配
* heartbeat - 多长时间将心跳更新发送到客户端以保持连接的活动。应小于客户的timeout设置 - 通常设置为其一半值。