var e = require('../entities');
var Promise = require('bluebird');
var orderManager = require('./orderManager');
var directionLegManager = require('./directionLegManager');

var update = function (route, json) {
	
	if(json.duration){
		route.duration = json.duration;
	}
	
	if(json.distance){
		route.distance = json.distance;
	}
    
    var vehiclePromise = e.findByExternalCode('Vehicle', JSON.parse(json.vehicle.id))
        .then(function(vehicle){
            route.vehicle = vehicle;
        });
        
    var distributionCenterPromise = e.findByRoutePointExternalCode('DistributionCenter', JSON.parse(json.start.location.id))
        .then(function(distributionCenter){
            route.distributionCenter = distributionCenter;
        });
	
	return Promise.all([vehiclePromise, distributionCenterPromise])
		.then(function(){
			return route.save();
		});
};

var getScheduledRoutes = function () {
	return e.Route.find({ status: 'PENDING' }).exec();
};

var findNotExecutedRoutes = function () {
	return e.Route.find({})
		.where('status', 'SHEDULED')
		.populate('distributionCenter')
		.populate('vehicle')
		.populate('driver')
		.sort({
			startDate: -1,
			status: -1
		})
		.exec();
};

var findRoute = function (externalCode) {
	return e.Route.find({})
		.where('externalCode.externalCode', externalCode.externalCode)
		.where('externalCode.origin', externalCode.origin)
		.populate('distributionCenter')
		.populate('vehicle')
		.populate('driver')
		.sort({
			startDate: -1,
			status: -1
		})
		.exec();
};

module.exports = {
	update: update,
	findRoute: findRoute,
	findNotExecutedRoutes: findNotExecutedRoutes,
	getScheduledRoutes: getScheduledRoutes
};