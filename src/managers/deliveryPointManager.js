var e = require('../entities');
var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var routePointManager = require('./routePointManager');
var calendarManager = require('./calendarManager');

var createOrUpdate = function(json){
  return e.findByExternalCode('DeliveryPoint', json.externalCode)
  .then(function(deliveryPoint){
    if (deliveryPoint) {
      return update(deliveryPoint, json);
    }
    return update(new e.DeliveryPoint({}), json);
  });
}
	
var update = function(deliveryPoint, json){

	if(json.name){ 
		deliveryPoint.name = json.name;
	}

	if(json.deliveryDuration){
		deliveryPoint.deliveryDuration = json.deliveryDuration;
	}

	if(json.externalCode){
		deliveryPoint.externalCode = json.externalCode;
	}

	var routePointPromise = routePointManager.createOrUpdate(json.routePoint)
	.then(function(routePoint){
		deliveryPoint.routePoint = routePoint;
	});

	var calendarPromise = calendarManager.createOrUpdate(json.calendar)
	.then(function(calendar){
		deliveryPoint.calendar = calendar;
	});

	return Promise.all([routePointPromise, calendarPromise])
	.then(function(){
		return deliveryPoint.save();
	});
};


module.exports = {
	createOrUpdate
};