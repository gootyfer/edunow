var express = require('express');
var app = express()
  , server = require('http').createServer(app);

app.use(express.static(__dirname + '/ui'));

server.listen(80);