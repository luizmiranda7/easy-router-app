var e = require('../entities');
var distributionCenterManager = require('./distributionCenterManager');

var createOrUpdate = function(json){
	if(!json){
		return e.nullPromise();
	}
	
  return e.findByExternalCode('Vehicle', json.externalCode)
  .then(function(vehicle){
    if (vehicle) {
      return update(vehicle, json);
    }
    return update(new e.Vehicle({}), json);
  });
}

var update = function(vehicle, json){

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

	if(json.externalCode){
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
        'calendar.intervals.finalDate' : { $lt: now }
	}).exec();
};

module.exports = {
	findAll,
	findVehicle,
	getAvailableVehicles,
	createOrUpdate
};