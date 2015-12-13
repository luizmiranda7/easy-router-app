var e = require('../entities');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var createDeliveryPoint = function(json){
	var deliveryPoint = new e.DeliveryPoint({});
	deliveryPoint.
	
	if(json.name){ deliveryPoint.name = json.name; }
	if(json.deliveryDuration){ deliveryPoint.deliveryDuration = json.deliveryDuration; }

	if(json.routePoint){
		e.findByExternalCode('RoutePoint', json.routePoint)
		.then((routePoint) => {
			if(routePoint){ return new Promise(routePoint);}
			return routePointManager.createRoutePoint(json.routePoint);
		})
		.then(function(routePoint){
			if(routePoint){
				deliveryPoint.routePoint = routePoint;
			}
		});
	}

	if(json.calendar){
		e.findByExternalCode('Calendar', json.calendar)
		.then(function(calendar){
			if(calendar){ return new Promise(calendar);}
			return calendarManager.createCalendar(json.calendar);
		})
		.then(function(calendar){
			if(calendar){
				deliveryPoint.calendar = calendar;
			}
		});
	}

	externalCodeManager.createExternalCode(json.externalCode)
	.then(function(externalCode){
		deliveryPoint.externalCode = externalCode._id;

		return externalCodeManager.findByExternalCode()
	})
};

var updateDeliveryPoint = function(deliveryPoint, json){
	deliveryPoint.update
}

module.exports = {
	createDeliveryPoint
};