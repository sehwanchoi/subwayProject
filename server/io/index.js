'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        socket.on('disasterStatus', function(msg) {
        	socket.emit('heard it', msg);
        });
        // Now have access to socket, wowzers!
    });
    return io

};