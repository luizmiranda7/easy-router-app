var e = require('../entities');
var routePointManager = require('./routePointManager');

var createOrUpdate = function(json){
	if(!json){
		return e.nullPromise();
	}
	
	return e.findByExternalCode('DistributionCenter', json.externalCode)
	.then(function(distributionCenter){
		if (distributionCenter) {
			return update(distributionCenter, json);
		}
		return update(new e.DistributionCenter({}), json);
	});
}
	
var update = function(distributionCenter, json){

	if(json.name){ 
		distributionCenter.name = json.name;
	}

	if(json.prepareDuration){
		distributionCenter.prepareDuration = json.prepareDuration;
	}

	if(json.externalCode){
		distributionCenter.externalCode = json.externalCode;
	}

	if(json.calendar){
		distributionCenter.calendar = json.calendar;
	}

	if(json.routePoint){
		distributionCenter.routePoint = routePointManager.createOrUpdate(distributionCenter.routePoint, json.routePoint);
	}

	return distributionCenter.save();
};


module.exports = {
	createOrUpdate
};