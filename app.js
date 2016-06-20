var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var app = require('express')();
var bodyParser = require('body-parser');
var jsonAdapters = require('./utils/jsonAdapters');
var path = require('path');
var swig = require('swig');

// View engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/view');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(bodyParser.json());

GLOBAL.rootDirName = __dirname;

var MONGO_DB = process.env.MONGODB;
var DOCKER_DB = process.env.DB_PORT;
if (DOCKER_DB) {
  MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/easyrouter';
}

mongoose.connect(MONGO_DB);
require('./entities');

var restController = require('./controllers/restController');
restController.initMethods(app);

var viewController = require('./controllers/viewController');
viewController.initMethods(app, __dirname);

var serverPort = process.env.PORT || 3000;
var server = app.listen(serverPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Easy router listening at http://%s:%s', host, port);

});
