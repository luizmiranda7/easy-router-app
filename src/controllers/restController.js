var _ = require('underscore');
var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var orderManager = require('../managers/orderManager');


var initMethods = function(app){

	app.put('/rest/orders', function(req, res){
		return orderManager.createOrUpdate(req.body);
	});

	app.put('/rest/drivers', function(req, res){
		return driverManager.createOrUpdate(req.body);
	});

	app.put('/rest/distributionCenters', function(req, res){
		return distributionCenterManager.createOrUpdate(req.body);
	});

	app.put('/rest/vehicles', function(req, res){
		return vehicleManager.createOrUpdate(req.body);
	});

};

module.exports = {
	initMethods
};