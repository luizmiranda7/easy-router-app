var e = require('../entities');
var Promise = require('bluebird');
var orderManager = require('./orderManager');
var directionLegManager = require('./directionLegManager');

var update = function (route, json) {
	
	if(json.duration)
		route.duration = json.duration;
	
	if(json.distance)
		route.distance = json.distance;
		
	if(json.status)
		route.status = json.status;
	else
		route.status = 'PENDING';
		
	var tourActivityPromises = [];
	if(json.tourActivities && json.tourActivities.tourActivities){
		tourActivityPromises = json.tourActivities.tourActivities.map(function(tourActivity){
			var type = tourActivity.capacity ? 'PICKUP' : 'DELIVER';
			return e.findByExternalCode('Order', JSON.parse(tourActivity.shipment.id))
				.then(function(order) {
					return {
						type: type,
						order: order
					};
				});
		});
	}
    
    var vehiclePromise = e.findByExternalCode('Vehicle', JSON.parse(json.vehicle.id))
        .then(function(vehicle){
            route.vehicle = vehicle;
        });
        
    var distributionCenterPromise = e.findByRoutePointExternalCode('DistributionCenter', JSON.parse(json.start.location.id))
        .then(function(distributionCenter){
            route.distributionCenter = distributionCenter;
        });
		
	var promises = tourActivityPromises;
	promises.push(vehiclePromise);
	promises.push(distributionCenterPromise);
	
	return Promise.all(promises)
		.then(function(){
			return route.save();
		});
};

var getScheduledRoutes = function () {
	return e.Route.find({ status: 'SCHEDULED' }).exec();
};

var findNotExecutedRoutes = function () {
	return e.Route.find({})
		.where('status', 'SCHEDULED')
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