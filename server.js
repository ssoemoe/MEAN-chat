var express = require("express");
var bodyParser = require("body-parser");
var io = require('socket.io');

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Initialize the app.
var server = app.listen(process.env.PORT || 80, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

var socket_io = io.listen(server);
socket_io.on('connection', (socket) => {
    console.log("Socket connection made.");

    socket.on('join', function (data) {
        socket.join(data.room);
        console.log(data, "- joined");
        socket.broadcast.to(data.room).emit('new-user', { user: data.user, message: 'has joined this room.' });
    });

    socket.on('message', function (data) {
        console.log(data);
        socket_io.in(data.room).emit('new-message', { user: data.user, message: data.message });
    })
});

