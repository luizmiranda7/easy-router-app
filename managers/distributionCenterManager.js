var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');
var routePointManager = require('./routePointManager');
	
var update = function(distributionCenter, json){

	if(json.name){ 
		distributionCenter.name = json.name;
	}

	if(json.prepareDuration){
		distributionCenter.prepareDuration = json.prepareDuration;
	}

	if(externalCodeManager.isValid(json.externalCode)){
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
	update: update
};