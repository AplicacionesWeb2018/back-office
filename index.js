'use strict'

const port = 8008;

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "127.0.0.1");

const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('port', port);

app.get('/', function(req, res) {
	app.use(express.static(path.join(__dirname)));
	res.render('index');
});

app.listen(port, function() {
    console.log('Client Listening on port' + port);
})