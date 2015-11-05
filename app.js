var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var jsonAdapters = require('./utils/jsonAdapters');

var app = express();
app.use(bodyParser.json({
	revive: jsonAdapters.reviveDates
}));

// Only require entities when connected
mongoose.connect('mongodb://localhost/easyrouter');
var e = require('./entities');

var restController = require('./controllers/restController');
restController.initMethods(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});