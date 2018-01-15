const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const cmd = require('./photo.js');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 3001});
wss.on('connection', function(ws) {
    ws.on('message', function(messages) {
        let message = eval('(' + messages + ')');  
        console.log(message);
        switch (message.type){
            case 'init':
                console.log('初始化手机设备');
                cmd.getPhoto();
            break;
            case 'send':
                if(cmd.setPhoto(message.time)){
                    ws.send("{'type':'send'}");
                }
            break;
        }
    });
    ws.on('error', function (err) {
        console.log('有客户端错误');
    });
});
console.log('启动成功');