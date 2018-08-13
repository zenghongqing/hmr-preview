const ws = require('nodejs-websocket');
const fs = require('fs');
const md = require('markdown-it')();
const http = require('http');
// const lineBreak = '\n';
const server = ws.createServer(function(socket) {
    fs.watch('test.md', function(stat, filename) {
        if (stat === 'change') {
            fs.readFile('test.md', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data.toString())
                socket.send(data.toString())
            })
        }
    })
    socket.on('text', function(str) {
        console.log(str);
    })
}).listen(8080)
console.log('websocket建立完毕')