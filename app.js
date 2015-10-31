var driverManager = require('./managers/driverManager.js');
var e = require('./entities');
var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get('/rest/addAddress', function (req, res) {
	var address = req.body;
	new e.Address(address).save();
});

app.get('/testando', function (req, res) {
  res.send('Hello World! Testando.	');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});