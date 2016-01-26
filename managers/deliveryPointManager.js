var e = require('../entities');
var routePointManager = require('./routePointManager');

var createOrUpdate = function(json){
	if(!json){
		return e.nullPromise();
	}
	
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

	if(json.calendar){
		deliveryPoint.calendar = json.calendar;
	}

	if(json.routePoint){
		deliveryPoint.routePoint = routePointManager.createOrUpdate(deliveryPoint.routePoint, json.routePoint)
	}

	return deliveryPoint.save();
};

module.exports = {
	createOrUpdate
};