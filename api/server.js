// Imports 
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter');

const PORT = 8080;

// Server instantiation
var server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configure routes
server.get('/', function (request, result) {
    result.setHeader('Content-Type', 'text/html');
    result.status(200).sendFile('./index.html', { root: __dirname });
});

// We use the API router by starting with /api/someRoute
server.use('/api', apiRouter);

// Launch server
server.listen(PORT, '0.0.0.0', function () {
    console.log('Server is listening on port ' + PORT + '...');
});