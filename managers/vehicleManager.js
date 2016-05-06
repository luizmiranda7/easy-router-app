var e = require('../entities');
var externalCodeManager = require('./externalCodeManager');
var distributionCenterManager = require('./distributionCenterManager');

var update = function(vehicle, json){

	if(json.maxVelocity){
		vehicle.maxVelocity = json.maxVelocity;
	}

	if(json.costPerTime){ 
		vehicle.costPerTime = json.costPerTime;
	}

	if(json.costPerDistance){ 
		vehicle.costPerDistance = json.costPerDistance;
	}

	if(json.totalWeight){ 
		vehicle.totalWeight = json.totalWeight;
	}

	if(json.totalVolume){ 
		vehicle.totalVolume = json.totalVolume;
	}

	if(json.axes){ 
		vehicle.axes = json.axes;
	}

	if(json.endTime){ 
		vehicle.endTime = json.endTime;
	}

	if(json.earliestStart){ 
		vehicle.earliestStart = json.earliestStart;
	}

	if(json.latestEnd){ 
		vehicle.latestEnd = json.latestEnd;
	}

	if(externalCodeManager.isValid(json.externalCode)){
		vehicle.externalCode = json.externalCode;
	}

	if(json.type){
		vehicle.type = json.type;
	}

	return distributionCenterManager.createOrUpdate(json.distributionCenter)
	.then(function(distributionCenter){
		if(distributionCenter){
			vehicle.currentDistributionCenter = distributionCenter;
		}
	})
	.then(function(){
		return vehicle.save();
	});

};

var findAll = function(vehicle){
	return e.Vehicle.find()
	.populate('currentDistributionCenter')
	.exec();
};

var findVehicle = function(externalCode){
	return e.findByExternalCodeWithPopulationFields('Vehicle', externalCode, ['currentDistributionCenter']);
};

var getAvailableVehicles = function(){
	var now = new Date();
	return e.Vehicle.find({
		$or: [
	    		{'calendar.intervals.finalDate' : { $lt: now }},
	    		{'calendar.intervals.finalDate' : null}
		]
	}).exec();
};

module.exports = {
	update: update,
	findAll: findAll,
	findVehicle: findVehicle,
	getAvailableVehicles: getAvailableVehicles
};