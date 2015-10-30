var dbManager = require('./managers/dbManager.js');
var driverManager = require('./managers/driverManager.js');
var e = require('./entities');
var express = require('express');
var app = express();

dbManager.initialize();

app.get('/', function (req, res) {
	e.DistributionCenter.findOne({}).then(function(distributionCenter){
  		driverManager.findAbleDrivers(distributionCenter);
	});
});

app.get('/testando', function (req, res) {
  res.send('Hello World! Testando.	');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});