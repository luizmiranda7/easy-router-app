var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');
var routePointManager = require('./routePointManager');


var update = function(deliveryPoint, json){

	if(json.name){
		deliveryPoint.name = json.name;
	}

	if(json.deliveryDuration){
		deliveryPoint.deliveryDuration = json.deliveryDuration;
	}

	if(externalCodeManager.isValid(json.externalCode)){
		deliveryPoint.externalCode = json.externalCode;
	}

	if(json.calendar){
		deliveryPoint.calendar = json.calendar;
	}

	if(json.routePoint){
		deliveryPoint.routePoint = routePointManager.createOrUpdate(deliveryPoint.routePoint, json.routePoint)
	}

	return deliveryPoint.save();
};

module.exports = {
	update: update
};
