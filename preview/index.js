const http = require('http');
const fs = require('fs');
const opn = require('opn');
const md = require('markdown-it')();

const params = process.argv.splice(2);

if (!params[0]) {
    console.log('must specify a md file.');
    console.log('必须指定一个md文件。');
    return;
}
const mdFile = params[0];

const port = params[1] || 8080;

const lineBreak = '\n';

http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            data = data.toString();
            data = data.replace(/__PORT__/, port);
            data = data.replace(/__FILENAME/, mdFile);
            res.write(data);
            res.end();
        })
    }
    // 消息推送地址
    if (req.url === '/message') {
        fs.readFile(mdFile, (err, data) => {
            let result = md.render(data.toString());
            res.writeHead(200, {
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            result = result.split(lineBreak).forEach(item => {
                res.write('data: ' + item + '\n')
            })
            res.write('data: \n\n');
            res.end();
        })
    }
}).listen(port);

// 自动打开浏览器
opn('http://127.0.0.1:' + port);