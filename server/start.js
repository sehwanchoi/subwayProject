'use strict';
var chalk = require('chalk');

// Create a node server instance! cOoL!
var server = require('http').createServer();

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

var createApplication = function() {
  var app = require('./app');
  server.on('request', app); // Attach the Express application.
  var io = require('./io')(server);
  // io(server); // iAttach socket.io.
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    socket.on('disasterStatus', function() {
      console.log('anything?')
    });
  });
};

var startServer = function() {

  var PORT = process.env.PORT || 1337;

  server.listen(PORT, function() {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
  });

};

startDb.then(createApplication).then(startServer).catch(function(err) {
  console.error('Initialization error:', chalk.red(err.message));
});

module.exports = server;