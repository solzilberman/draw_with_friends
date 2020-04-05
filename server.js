var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('./public'));
console.log("My server is running...");

var socket = require('socket.io');

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("New connection: " + socket.id);

    //if message comes in as 'mouse' --> call mouseMsg
    socket.on('mouse', mouseMsg);
    socket.on('clear', clearScreen);

    function clearScreen() {
        io.sockets.emit('clear');
    }

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}