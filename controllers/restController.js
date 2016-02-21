var express = require('express');
var e = require('../entities');
var mongoose = require('mongoose');
var routeManager = require('../managers/routeManager');
var orderManager = require('../managers/orderManager');
var driverManager = require('../managers/driverManager');
var distributionCenterManager = require('../managers/distributionCenterManager');
var vehicleManager = require('../managers/vehicleManager');

// REST Methods - Retrieve, Create, Update and Delete
var initMethods = function(app){
    var router = express.Router();
    router.use(function(req, res, next) {
        console.log("/" + req.method);
        next();
    });
	
	// Retrieve Methods - REST
	router.get('/orders', function(req, res){
		return e.findByExternalCode.get('Order', req.body);
	});

	// Retrieve Methods - REST
	router.get('/pendingOrders', function(req, res){
		return orderManager.findPendingOrders();
	});

	router.get('/drivers', function(req, res){
		return e.findByExternalCode.get('Driver', req.body);
	});

	router.get('/distributionCenters', function(req, res){
		return e.findByExternalCode.get('DistributionCenter', req.body);
	});

	router.get('/vehicles', function(req, res){
		return e.findByExternalCode.get('Vehicle', req.body);
	});

	// Not default gets - REST
	router.post('/getOrders', function(req, res){
		return orderManager.findOrders(req.body)
		.then(function(orders){
			res.send(orders);
		});
	});

	router.get('/getAvailableDrivers', function(req, res){
		return driverManager.getAvailableDrivers()
		.then(function(drivers){
			res.send(drivers);
		});
	});

	router.get('/getAvailableVehicles', function(req, res){
		return vehicleManager.getAvailableVehicles()
		.then(function(vehicles){
			res.send(vehicles);
		});
	});

	// Create and Update Methods - REST
	router.post('/orders', function(req, res){
		if(req.headers.del){
			return e.deleteByExternalCode('Order', req.body)
			.then(function(order){
				res.send(order);
			});
		}

		orderManager.createOrUpdate(req.body)
		.then(function(order){
			res.send(order);
		});
	});

	router.post('/drivers', function(req, res){
		if(req.headers.del){
			return e.deleteByExternalCode('Driver', req.body)
			.then(function(driver){
				res.send(driver);
			});
		}
		return driverManager.createOrUpdate(req.body)
		.then(function(driver){
			res.send(driver);
		});
	});

	router.post('/distributionCenters', function(req, res){
		if(req.headers.del){
			return e.deleteByExternalCode('DistributionCenter', req.body)
			.then(function(distributionCenters){
				res.send(distributionCenters);
			});
		}
		return distributionCenterManager.createOrUpdate(req.body)
		.then(function(distributionCenter){
			res.send(distributionCenter);
		});
	});

	router.post('/vehicles', function(req, res){
		if(req.headers.del){
			return e.deleteByExternalCode('Vehicle', req.body)
			.then(function(vehicle){
				res.send(vehicle);
			});
		}
		return vehicleManager.createOrUpdate(req.body)
		.then(function(vehicle){
			res.send(vehicle);
		});
	});

    app.use("/rest", router);

};

module.exports = {
	initMethods
};