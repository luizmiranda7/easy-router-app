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

module.exports = {
  computeRoutes,
  getScheduledRoutes,
  getDirectionLegUpdateRequest
};