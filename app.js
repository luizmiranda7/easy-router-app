var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var jsonAdapters = require('./src/utils/jsonAdapters');

var app = express();
app.use(bodyParser.json({
	revive: jsonAdapters.reviveDates
}));

// Only require entities when connected
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/easyrouter');
var e = require('./src/entities');

var restController = require('./src/controllers/restController');
restController.initMethods(app);

var viewController = require('./src/controllers/viewController');
viewController.initMethods(app, __dirname);

app.use('/lib',  express.static(__dirname + '/src/view/lib'));
app.use('/css',  express.static(__dirname + '/src/view/css'));
app.use('/images',  express.static(__dirname + '/src/view/images'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Easy router listening at http://%s:%s', host, port);
});
