var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var jsonAdapters = require('./utils/jsonAdapters');
var path = require('path');
var swig = require('swig');

var app = express();
// View engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/view');
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Basic express configuration
app.use(bodyParser.json());

// Only require entities when connected
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/easyrouter');
var e = require('./entities');

var restController = require('./controllers/restController');
restController.initMethods(app);

GLOBAL.rootDirName = __dirname;
var viewController = require('./controllers/viewController');
viewController.initMethods(app);

app.use('/view/js',  express.static(__dirname + '/view/js'));
app.use('/view/lib',  express.static(__dirname + '/view/lib'));
app.use('/view/css',  express.static(__dirname + '/view/css'));
app.use('/view/images',  express.static(__dirname + '/view/images'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Easy router listening at http://%s:%s', host, port);
});