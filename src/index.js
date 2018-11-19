'use strict'
var http = require('http');
const app = require('./config/server')
require('./app/routes/products')(app);

//starting the server
app.listen(app.get('port'), () =>{
	console.log('server running on port ', app.get('port'));
});

/* const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('port', port);

app.get('/', function(req, res) {
	app.use(express.static(path.join(__dirname)));
	res.render('/src/views/pages/index.ejs');
});

app.listen(port, function() {
    console.log('Client Listening on port: ' + port);
}) */