// Imports 
var express = require('express');

// Server instantiation
var server = express();

// Configure route
server.get('/', function (request, result) {
    result.setHeader('Content-Type', 'text/html');
    result.status(200).send('<h1>Hello</h1>');
});

// Launch server
server.listen(8080, 'localhost', function () {
    console.log('server is listening...');
});