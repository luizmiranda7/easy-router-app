var e = require('../entities');
var orderManager = require('./orderManager');
var directionLegManager = require('./directionLegManager');

// 1o - gets distance/duration of all direction legs
var getDirectionLegUpdateRequest = function(ordersExternalCodes){
  	return orderManager.findOrders(ordersExternalCodes)
	.then(function(orders){
		var routePoints = orders.map(function(order){
			return order.deliveryPoint.routePoint;
		});
		orders.forEach(function(order){
			routePoints.push(order.distributionCenter.routePoint);
		});

		routePoints = routePoints.filter(function(item, pos, self) {
		    return self.indexOf(item).externalCode == pos.externalCode;
		});

		return directionLegManager.getDirectionLegUpdateRequest(routePoints);
	});
};

var computeRoutes = function(orders, directionLegs){

};

var getScheduledRoutes = function(){
	return e.Route.find({status: 'Pending'}).exec();
};

var findNotExecutedRoutes = function(){
	return e.Route.find({
		status: { $in: ['PENDING', 'SHEDULED'] }
	})
	.populate('distributionCenter')
	.populate('vehicle')
	.populate('driver')
	.sort({ 
		startDate: -1,
		status: -1
	})
	.exec();
}

var findRoute = function(externalCode){
	return e.Route.find({
		"externalCode.externalCode": externalCode.externalCode,
		"externalCode.origin": externalCode.origin
	})
	.populate('distributionCenter')
	.populate('vehicle')
	.populate('driver')
	.sort({ 
		startDate: -1,
		status: -1
	})
	.exec();
}

module.exports = {
  computeRoutes,
  getScheduledRoutes,
  getDirectionLegUpdateRequest,
  findNotExecutedRoutes,
  findRoute
};