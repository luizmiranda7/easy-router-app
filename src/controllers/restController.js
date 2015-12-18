var e = require('../entities');
var mongoose = require('mongoose');
var orderManager = require('../managers/orderManager');
var driverManager = require('../managers/driverManager');
var distributionCenterManager = require('../managers/distributionCenterManager');
var vehicleManager = require('../managers/vehicleManager');


// REST Methods - Retrieve, Create, Update and Delete
var initMethods = function(app){
	
	// Retrieve Methods - REST
	app.get('/rest/orders', function(req, res){
		return orderManager.get(req.body);
	});

	app.get('/rest/drivers', function(req, res){
		return driverManager.get(req.body);
	});

	app.get('/rest/distributionCenters', function(req, res){
		return distributionCenterManager.get(req.body);
	});

	app.get('/rest/vehicles', function(req, res){
		return vehicleManager.get(req.body);
	});

	// Create and Update Methods - REST
	app.post('/rest/orders', function(req, res){
		return orderManager.createOrUpdate(req.body);
	});

	app.post('/rest/drivers', function(req, res){
		return driverManager.createOrUpdate(req.body);
	});

	app.post('/rest/distributionCenters', function(req, res){
		return distributionCenterManager.createOrUpdate(req.body);
	});

	app.post('/rest/vehicles', function(req, res){
		return vehicleManager.createOrUpdate(req.body);
	});

	// Delete methods - REST	
	app.delete('/rest/drivers', function(req, res){
		return driverManager.delete(req.body);
	});

	app.delete('/rest/distributionCenters', function(req, res){
		return distributionCenterManager.delete(req.body);
	});

	app.delete('/rest/vehicles', function(req, res){
		return vehicleManager.delete(req.body);
	});

};

module.exports = {
	initMethods
};