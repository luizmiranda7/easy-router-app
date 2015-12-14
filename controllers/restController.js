var _ = require('underscore');
var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var orderManager = require('../managers/orderManager');


var initMethods = function(app){

	app.put('/orders', function(req, res){
		return orderManager.createOrUpdate(req.body);
	});

	app.put('/drivers', function(req, res){
		return driverManager.createOrUpdate(req.body);
	});

	app.put('/distributionCenters', function(req, res){
		return distributionCenterManager.createOrUpdate(req.body);
	});

	app.put('/vehicles', function(req, res){
		return vehicleManager.createOrUpdate(req.body);
	});

};

module.exports = {
	initMethods
};