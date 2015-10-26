var dbManager = require('./managers/dbManager.js');
var express = require('express');
var app = express();

dbManager.initialize();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/testando', function (req, res) {
  res.send('Hello World! Testando.	');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});